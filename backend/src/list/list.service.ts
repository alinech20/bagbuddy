import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './entities/List';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async getUserLists(profileId: number): Promise<List[]> {
    return await this.listRepository.find({
      where: { profile_id: profileId },
      relations: ['template'],
    });
  }

  async getListById(id: number): Promise<List | null> {
    return await this.listRepository.findOne({
      where: { id },
      relations: ['owner', 'template'],
    });
  }
}
