import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProfileCreate } from './interfaces/profile';
import { Profile } from './entities/Profile';
import { TravelPreferences } from './entities/TravelPreferences';
import { HealthSafety } from './entities/HealthSafety';
import { TravelPersonalization } from './entities/TravelPersonalization';
import { AdditionalDetails } from './entities/AdditionalDetails';
import {
  AdditionalDetailsDto,
  HealthSafetyDto,
  TravelPersonalizationDto,
  TravelPreferencesDto,
  UpdateProfileDto,
} from './dto/updateProfile.dto';

/**
 * Service to manage profile-related operations.
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(TravelPreferences)
    private readonly travelPreferencesRepository: Repository<TravelPreferences>,
    @InjectRepository(HealthSafety)
    private readonly healthSafetyRepository: Repository<HealthSafety>,
    @InjectRepository(TravelPersonalization)
    private readonly travelPersonalizationRepository: Repository<TravelPersonalization>,
    @InjectRepository(AdditionalDetails)
    private readonly additionalDetailsRepository: Repository<AdditionalDetails>,
  ) {}

  /**
   * Creates a new profile with the given UID and email.
   * @param profile - The profile data to create.
   * @returns The created profile.
   */
  createProfileWithUidAndEmail(profile: IProfileCreate): Promise<Profile> {
    const p = this.profileRepository.create(profile);
    return this.profileRepository.save(p);
  }

  /**
   * Retrieves a profile by Firebase UID.
   * @param uid - The Firebase UID of the profile.
   * @returns The profile if found, otherwise null.
   */
  getProfileByFirebaseUid(uid: string): Promise<Profile | null> {
    return this.profileRepository.findOneBy({ uid });
  }

  /**
   * Retrieves a profile by its ID.
   * @param id - The ID of the profile.
   * @returns The profile if found, otherwise null.
   */
  getProfileById(id: number): Promise<Profile | null> {
    return this.profileRepository.findOneBy({ id });
  }

  /**
   * Updates the travel preferences for a profile.
   * @param profileId - The ID of the profile.
   * @param travelPreferencesDto - The travel preferences data to update.
   * @returns The updated travel preferences.
   */
  private async updateTravelPreferences(
    profileId: number,
    travelPreferencesDto: TravelPreferencesDto,
  ): Promise<TravelPreferences> {
    let travelPreferences = await this.travelPreferencesRepository.findOneBy({
      profile: { id: profileId },
    });

    if (!travelPreferences) {
      travelPreferences = this.travelPreferencesRepository.create({
        profile: { id: profileId },
        ...travelPreferencesDto,
      });
    } else {
      Object.assign(travelPreferences, travelPreferencesDto);
    }

    return this.travelPreferencesRepository.save(travelPreferences);
  }

  /**
   * Updates the health and safety information for a profile.
   * @param profileId - The ID of the profile.
   * @param healthSafetyDto - The health and safety data to update.
   * @returns The updated health and safety information.
   */
  private async updateHealthSafety(
    profileId: number,
    healthSafetyDto: HealthSafetyDto,
  ): Promise<HealthSafety> {
    let healthSafety = await this.healthSafetyRepository.findOneBy({
      profile: { id: profileId },
    });

    if (!healthSafety) {
      healthSafety = this.healthSafetyRepository.create({
        profile: { id: profileId },
        ...healthSafetyDto,
      });
    } else {
      Object.assign(healthSafety, healthSafetyDto);
    }

    return this.healthSafetyRepository.save(healthSafety);
  }

  /**
   * Updates the travel personalization information for a profile.
   * @param profileId - The ID of the profile.
   * @param personalizationDto - The travel personalization data to update.
   * @returns The updated travel personalization information.
   */
  private async updatePersonalization(
    profileId: number,
    personalizationDto: TravelPersonalizationDto,
  ): Promise<TravelPersonalization> {
    let personalization = await this.travelPersonalizationRepository.findOneBy({
      profile: { id: profileId },
    });

    if (!personalization) {
      personalization = this.travelPersonalizationRepository.create({
        profile: { id: profileId },
        ...personalizationDto,
      });
    } else {
      Object.assign(personalization, personalizationDto);
    }

    return this.travelPersonalizationRepository.save(personalization);
  }

  /**
   * Updates the additional details for a profile.
   * @param profileId - The ID of the profile.
   * @param additionalDetails - The additional details data to update.
   * @returns The updated additional details.
   */
  private async updateAdditionalDetails(
    profileId: number,
    additionalDetails: AdditionalDetailsDto,
  ): Promise<AdditionalDetails> {
    let details = await this.additionalDetailsRepository.findOneBy({
      profile: { id: profileId },
    });

    if (!details) {
      details = this.additionalDetailsRepository.create({
        profile: { id: profileId },
        ...additionalDetails,
      });
    } else {
      Object.assign(details, additionalDetails);
    }

    return this.additionalDetailsRepository.save(details);
  }

  /**
   * Updates related entities for a profile.
   * @param profileId - The ID of the profile.
   * @param updateProfileDto - The profile update data.
   */
  async updateRelatedEntities(
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    if (updateProfileDto.travel_preferences) {
      await this.updateTravelPreferences(
        profileId,
        updateProfileDto.travel_preferences,
      );
    }

    if (updateProfileDto.health_safety) {
      await this.updateHealthSafety(profileId, updateProfileDto.health_safety);
    }

    if (updateProfileDto.personalization) {
      await this.updatePersonalization(
        profileId,
        updateProfileDto.personalization,
      );
    }

    if (updateProfileDto.additional_details) {
      await this.updateAdditionalDetails(
        profileId,
        updateProfileDto.additional_details,
      );
    }
  }

  /**
   * Saves the profile to the repository.
   * @param profile - The profile to save.
   * @returns The saved profile.
   */
  save(profile: Profile): Promise<Profile> {
    return this.profileRepository.save(profile);
  }
}
