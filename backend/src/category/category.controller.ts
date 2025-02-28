import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
}
