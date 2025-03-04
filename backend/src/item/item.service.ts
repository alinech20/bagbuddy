import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/Item';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async getItemsByCategoryId(id: number): Promise<Item[] | null> {
    return await this.itemRepository.find({
      where: { category: { id } },
    });
  }
}
