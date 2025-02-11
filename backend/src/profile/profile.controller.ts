import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './entities/Profile';
import * as admin from 'firebase-admin';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller({
  path: 'profile',
  version: '1',
})
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  public async getOwnProfile(@Req() req: Request): Promise<Profile> {
    // @ts-expect-error ts not knowing about custom added property
    const uid = (req.user as admin.auth.DecodedIdToken).uid;
    if (!uid) throw new NotFoundException();

    const profile = await this.profileService.getProfileByFirebaseUid(uid);
    if (!profile) throw new NotFoundException();

    return profile;
  }

  @Get(':profileId')
  @UseGuards(FirebaseAuthGuard)
  public async getProfile(
    @Param('profileId') profileId: string,
  ): Promise<Profile> {
    const id = Number.parseInt(profileId, 10);
    if (isNaN(id)) throw new NotFoundException();

    const profile = await this.profileService.getProfileById(id);
    if (!profile) throw new NotFoundException();

    return profile;
  }
}
