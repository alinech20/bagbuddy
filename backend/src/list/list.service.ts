import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/List';
import { DataSource, Repository } from 'typeorm';
import { CreateListDto } from './dto/createList.dto';
import { ListItem } from './entities/ListItem';

/**
 * Service for handling list-related operations.
 */
@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Retrieves lists for a user by profile ID.
   *
   * @param {number} profileId - The ID of the profile to retrieve lists for.
   * @returns {Promise<List[]>} A promise that resolves to an array of List entities.
   */
  async getUserLists(profileId: number): Promise<List[]> {
    return await this.listRepository.find({
      where: { profile_id: profileId },
      relations: ['template'],
    });
  }

  /**
   * Retrieves the lists of the currently authenticated user.
   *
   * @param {string} uid - The UID of the authenticated user.
   * @returns {Promise<List[]>} A promise that resolves to an array of List entities.
   */
  async getOwnLists(uid: string): Promise<List[]> {
    return await this.listRepository.find({
      where: { owner: { uid } },
      relations: ['template'],
    });
  }

  /**
   * Retrieves a list by its ID.
   *
   * @param {number} id - The ID of the list to retrieve.
   * @returns {Promise<List | null>} A promise that resolves to the List entity or null if not found.
   */
  async getListById(id: number): Promise<List | null> {
    return await this.listRepository.findOne({
      where: { id },
      relations: ['owner', 'template', 'list_items', 'list_items.item'],
    });
  }

  /**
   * Creates a new list with the given data
   *
   * @param {CreateListDto} list - The data for the new list
   * @returns {Promise<List>} A promise that resolves to the created List entity
   */
  async saveList(list: CreateListDto): Promise<List | null> {
    return await this.dataSource.transaction(async (manager) => {
      const { items = [], profile_id, ...listData } = list;

      const newList = await manager.save(
        manager.create(List, {
          ...listData,
          is_template: listData.is_template ?? false,
          owner: { id: profile_id },
        }),
      );

      if (items.length) {
        const listItems = items.map((item) =>
          manager.create(ListItem, {
            ...item,
            list: newList,
            item: { id: item.item_id },
          }),
        );

        await manager.save(listItems);
      }

      return this.getListById(newList.id);
    });
  }
}
