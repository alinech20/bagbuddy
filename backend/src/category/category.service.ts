import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/Category';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getCategoryById(id: number): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['parent', 'subcategories'],
    });
  }
}
