import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ListDto } from './dto/readList.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ListService } from './list.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller({
  path: 'lists',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(ListDto))
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getUserLists(
    @Body() { profile_id }: { profile_id: string },
  ): Promise<ListDto[]> {
    const id = Number.parseInt(profile_id, 10);
    if (isNaN(id)) throw new NotFoundException('Invalid profile ID');

    return await this.listService.getUserLists(id);
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard)
  public async getListById(@Param('id') id: string): Promise<ListDto> {
    const listId = Number.parseInt(id, 10);
    if (isNaN(listId)) throw new NotFoundException('Invalid list ID');

    const list = await this.listService.getListById(listId);
    if (!list) throw new NotFoundException('List not found');

    return list;
  }
}
