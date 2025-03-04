import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import * as admin from 'firebase-admin';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ProfileDto } from './dto/readProfile.dto';

/**
 * ProfileController handles default-related endpoints.
 * It includes methods to get and update the user's own default.
 */
@Controller({
  path: 'profile',
  version: '1',
})
@UseInterceptors(new TransformInterceptor(ProfileDto))
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Get the default of the currently authenticated user.
   * @param req - The request object containing the authenticated user's information.
   * @returns The default of the authenticated user.
   * @throws UnauthorizedException if the user is not authenticated.
   * @throws NotFoundException if the default is not found.
   */
  @Get('self/')
  @UseGuards(FirebaseAuthGuard)
  public async getOwnProfile(@Req() req: Request): Promise<ProfileDto> {
    // @ts-expect-error ts not knowing about custom added property
    const uid = (req.user as admin.auth.DecodedIdToken).uid;
    if (!uid) throw new UnauthorizedException('No uid found in request');

    const profile = await this.profileService.getProfileByFirebaseUid(
      uid,
      true,
    );

    if (!profile) throw new NotFoundException('Profile not found');

    return {
      ...profile,
      created_at: new Date(profile.created_at),
      updated_at: new Date(profile.updated_at),
    };
  }

  /**
   * Update the default of the currently authenticated user.
   * @param req - The request object containing the authenticated user's information.
   * @param updateProfileDto - The DTO containing the default update data.
   * @returns The updated default of the authenticated user.
   * @throws UnauthorizedException if the user is not authenticated or authorized to update the default.
   * @throws NotFoundException if the default is not found.
   */
  @Patch('self/')
  @UseGuards(FirebaseAuthGuard)
  public async updateOwnProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileDto> {
    // @ts-expect-error ts not knowing about custom added property
    const uid = (req.user as admin.auth.DecodedIdToken).uid;
    if (!uid) throw new UnauthorizedException('No uid found in request');

    const profile = await this.profileService.getProfileByFirebaseUid(uid);
    if (!profile) throw new NotFoundException('Profile not found');

    // Update default fields
    const res = await this.profileService.updateProfile(
      profile,
      updateProfileDto,
    );

    return {
      ...res,
      created_at: new Date(res.created_at),
      updated_at: new Date(res.updated_at),
    };
  }

  /**
   * Get the default by default ID.
   * @param profileId - The ID of the default to retrieve.
   * @returns The default with the specified ID.
   * @throws NotFoundException if the default ID is invalid or the default is not found.
   */
  @Get(':profileId')
  @UseGuards(FirebaseAuthGuard)
  public async getProfile(
    @Param('profileId') profileId: string,
  ): Promise<ProfileDto> {
    const id = Number.parseInt(profileId, 10);
    if (isNaN(id)) throw new NotFoundException('Invalid default id');

    const profile = await this.profileService.getProfileById(id);
    if (!profile) throw new NotFoundException('Profile not found');

    return {
      ...profile,
      created_at: new Date(profile.created_at),
      updated_at: new Date(profile.updated_at),
    };
  }
}
