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

/**
 * Controller for handling item-related requests.
 * Applies the `TransformInterceptor` to transform responses to `ItemDto`.
 */
@Controller({
  path: 'items',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(ItemDto))
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  /**
   * Retrieves items by category ID.
   * Protected by `FirebaseAuthGuard`.
   *
   * @param {string} catId - The ID of the category to retrieve items for.
   * @returns {Promise<ItemDto[]>} A promise that resolves to an array of `ItemDto`.
   * @throws {NotFoundException} If the category ID is invalid or no items are found.
   */
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

  /**
   * Retrieves all items.
   * Protected by `FirebaseAuthGuard`.
   *
   * @returns {Promise<ItemDto[]>} A promise that resolves to an array of `ItemDto`.
   * @throws {NotFoundException} If no items are found.
   */
  @Get('/')
  @UseGuards(FirebaseAuthGuard)
  public async getAllItems(): Promise<ItemDto[]> {
    const items = await this.itemService.getAllItems();
    if (!items) throw new NotFoundException('Items not found');

    return items;
  }
}
