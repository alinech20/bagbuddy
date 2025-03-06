import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: { parent_id: IsNull() },
      order: { id: 'ASC' },
      relations: ['subcategories'],
    });
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'subcategories'],
    });
  }
}
