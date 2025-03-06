import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { CategoryDto } from './dto/readCategory.dto';

@Controller({
  path: 'categories',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(CategoryDto))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getAllCategories(): Promise<CategoryDto[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':catId')
  @UseGuards(FirebaseAuthGuard)
  public async getCategoryById(
    @Param('catId') catId: string,
  ): Promise<CategoryDto> {
    const id = Number.parseInt(catId, 10);
    if (isNaN(id)) throw new NotFoundException('Invalid category ID');

    const category = await this.categoryService.getCategoryById(id);
    if (!category) throw new NotFoundException('Category not found');

    return category;
  }
}
