import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/Item';
import { Repository } from 'typeorm';

/**
 * Service for handling item-related operations.
 */
@Injectable()
export class ItemService {
  /**
   * Constructs a new instance of the ItemService.
   *
   * @param {Repository<Item>} itemRepository - The repository for accessing item data.
   */
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  /**
   * Retrieves items by category ID.
   *
   * @param {number} id - The ID of the category to retrieve items for.
   * @returns {Promise<Item[] | null>} A promise that resolves to an array of Item entities or null if not found.
   */
  async getItemsByCategoryId(id: number): Promise<Item[] | null> {
    return await this.itemRepository.find({
      where: { category: { id } },
    });
  }

  /**
   * Retrieves all items.
   *
   * @returns {Promise<Item[] | null>} A promise that resolves to an array of Item entities or null if not found.
   */
  async getAllItems(): Promise<Item[] | null> {
    return await this.itemRepository.find();
  }
}
