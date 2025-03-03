import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { Category } from './entities/Category';

@Controller({
  path: 'category',
  version: '1',
})
// @UseInterceptors(new TransformInterceptor(CategoryDto))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get(':catId')
  @UseGuards(FirebaseAuthGuard)
  public async getCategoryById(
    @Param('catId') catId: string,
  ): Promise<Category> {
    const id = Number.parseInt(catId, 10);
    if (isNaN(id)) throw new NotFoundException('Invalid category ID');

    const category = await this.categoryService.getCategoryById(id);
    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
