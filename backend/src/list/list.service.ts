import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/List';
import { Repository } from 'typeorm';
import { CreateListDto } from './dto/createList.dto';

/**
 * Service for handling list-related operations.
 */
@Injectable()
export class ListService {
  /**
   * Constructs a new instance of the ListService.
   *
   * @param {Repository<List>} listRepository - The repository for accessing list data.
   */
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
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
   * Retrieves a list by its ID.
   *
   * @param {number} id - The ID of the list to retrieve.
   * @returns {Promise<List | null>} A promise that resolves to the List entity or null if not found.
   */
  async getListById(id: number): Promise<List | null> {
    return await this.listRepository.findOne({
      where: { id },
      relations: ['owner', 'template'],
    });
  }

  /**
   * Creates a new list with the given data
   *
   * @param {CreateListDto} list - The data for the new list
   * @returns {Promise<List>} A promise that resolves to the created List entity
   */
  async saveList(list: CreateListDto): Promise<List> {
    const l = this.listRepository.create(list);
    return await this.listRepository.save(l);
  }
}
