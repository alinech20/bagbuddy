import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ItemDto } from './dto/readItem.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller({
  path: 'items',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(ItemDto))
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('category/:catId')
  @UseGuards(FirebaseAuthGuard)
  public async getItemsByCategoryId(
    @Param('catId') catId: string,
  ): Promise<ItemDto[]> {
    const id = Number.parseInt(catId, 10);
    if (isNaN(id)) throw new NotFoundException('Invalid category ID');

    const items = await this.itemService.getItemsByCategoryId(id);
    if (!items) throw new NotFoundException('Items not found');

    return items;
  }
}
