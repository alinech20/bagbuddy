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

/**
 * Controller for handling category-related requests.
 * Applies the `TransformInterceptor` to transform responses to `CategoryDto`.
 */
@Controller({
  path: 'categories',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(CategoryDto))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Retrieves all categories.
   * Protected by `FirebaseAuthGuard`.
   *
   * @returns {Promise<CategoryDto[]>} A promise that resolves to an array of `CategoryDto`.
   */
  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getAllCategories(): Promise<CategoryDto[]> {
    return this.categoryService.getAllCategories();
  }

  /**
   * Retrieves a category by its ID.
   * Protected by `FirebaseAuthGuard`.
   *
   * @param {string} catId - The ID of the category to retrieve.
   * @returns {Promise<CategoryDto>} A promise that resolves to the `CategoryDto` of the requested category.
   * @throws {NotFoundException} If the category ID is invalid or the category is not found.
   */
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
