import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ListDto } from './dto/readList.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ListService } from './list.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { CreateListDto } from './dto/createList.dto';

/**
 * Controller for handling list-related requests.
 * Applies the `TransformInterceptor` to transform responses to `ListDto`.
 */
@Controller({
  path: 'lists',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(ListDto))
export class ListController {
  constructor(private readonly listService: ListService) {}

  /**
   * Retrieves lists for a user by profile ID.
   * Protected by `FirebaseAuthGuard`.
   *
   * @param {Object} body - The request body containing the profile ID.
   * @param {string} body.profile_id - The ID of the profile to retrieve lists for.
   * @returns {Promise<ListDto[]>} A promise that resolves to an array of `ListDto`.
   * @throws {NotFoundException} If the profile ID is invalid.
   */
  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getUserLists(
    @Body() { profile_id }: { profile_id: string },
  ): Promise<ListDto[]> {
    const id = Number.parseInt(profile_id, 10);
    if (isNaN(id)) throw new NotFoundException('Invalid profile ID');

    return (await this.listService.getUserLists(id)).map((list) => ({
      ...list,
      owner: {
        ...list.owner,
        created_at: new Date(list.owner.created_at),
        updated_at: new Date(list.owner.updated_at),
      },
    }));
  }

  /**
   * Retrieves a list by its ID.
   * Protected by `FirebaseAuthGuard`.
   *
   * @param {string} id - The ID of the list to retrieve.
   * @returns {Promise<ListDto>} A promise that resolves to the `ListDto` of the requested list.
   * @throws {NotFoundException} If the list ID is invalid or the list is not found.
   */
  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  public async getListById(@Param('id') id: string): Promise<ListDto> {
    const listId = Number.parseInt(id, 10);
    if (isNaN(listId)) throw new NotFoundException('Invalid list ID');

    const list = await this.listService.getListById(listId);
    if (!list) throw new NotFoundException('List not found');

    return {
      ...list,
      owner: {
        ...list.owner,
        created_at: new Date(list.owner.created_at),
        updated_at: new Date(list.owner.updated_at),
      },
    };
  }

  // TODO: save list items in lists_items; use transaction
  @Post()
  @UseGuards(FirebaseAuthGuard)
  public async saveList(@Body() createList: CreateListDto): Promise<ListDto> {
    const list = await this.listService.saveList(createList);

    return {
      ...list,
      owner: {
        ...list.owner,
        created_at: new Date(list.owner.created_at),
        updated_at: new Date(list.owner.updated_at),
      },
    };
  }
}
