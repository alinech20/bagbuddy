import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category';
import { IsNull, Repository } from 'typeorm';

/**
 * Service for handling category-related operations.
 */
@Injectable()
export class CategoryService {
  /**
   * Constructs a new instance of the CategoryService.
   *
   * @param {Repository<Category>} categoryRepository - The repository for accessing category data.
   */
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * Retrieves all categories that do not have a parent category.
   *
   * @returns {Promise<Category[]>} A promise that resolves to an array of Category entities.
   */
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { parent_id: IsNull() },
      order: { id: 'ASC' },
      relations: ['subcategories'],
    });
  }

  /**
   * Retrieves a category by its ID.
   *
   * @param {number} id - The ID of the category to retrieve.
   * @returns {Promise<Category | null>} A promise that resolves to the Category entity or null if not found.
   */
  async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'subcategories'],
    });
  }
}
