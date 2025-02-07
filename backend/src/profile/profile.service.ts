import { Injectable } from '@nestjs/common';
import { IProfileCreate } from './interfaces/profile';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/Profile';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  createProfileWithUidAndEmail(profile: IProfileCreate): Promise<Profile> {
    const p = this.profileRepository.create(profile);
    return this.profileRepository.save(p);
  }

  getProfileByFirebaseUid(uid: string): Promise<Profile | null> {
    return this.profileRepository.findOneBy({ uid });
  }

  getProfileById(id: number): Promise<Profile | null> {
    return this.profileRepository.findOneBy({ id });
  }
}
