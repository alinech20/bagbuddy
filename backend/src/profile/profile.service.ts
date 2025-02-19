import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
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
    private readonly dataSource: DataSource,
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
   * @param fetchRelated - Whether to fetch related entities.
   * @returns The profile if found, otherwise null.
   */
  getProfileByFirebaseUid(
    uid: string,
    fetchRelated: boolean = false,
  ): Promise<Profile | null> {
    const relations = fetchRelated
      ? [
          'travel_preferences',
          'health_safety',
          'travel_personalization',
          'additional_details',
        ]
      : undefined;

    return this.profileRepository.findOne({
      where: { uid },
      relations,
    });
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
   * @param manager
   * @returns The updated travel preferences.
   */
  private async updateTravelPreferences(
    profileId: number,
    travelPreferencesDto: TravelPreferencesDto,
    manager: EntityManager,
  ): Promise<TravelPreferences> {
    let travelPreferences = await manager.findOneBy(TravelPreferences, {
      profile: { id: profileId },
    });

    if (!travelPreferences) {
      travelPreferences = manager.create(TravelPreferences, {
        profile: { id: profileId },
        ...travelPreferencesDto,
      });
    } else {
      Object.assign(travelPreferences, travelPreferencesDto);
    }

    return manager.save(travelPreferences);
  }

  /**
   * Updates the health and safety information for a profile.
   * @param profileId - The ID of the profile.
   * @param healthSafetyDto - The health and safety data to update.
   * @param manager
   * @returns The updated health and safety information.
   */
  private async updateHealthSafety(
    profileId: number,
    healthSafetyDto: HealthSafetyDto,
    manager: EntityManager,
  ): Promise<HealthSafety> {
    let healthSafety = await manager.findOneBy(HealthSafety, {
      profile: { id: profileId },
    });

    if (!healthSafety) {
      healthSafety = manager.create(HealthSafety, {
        profile: { id: profileId },
        ...healthSafetyDto,
      });
    } else {
      Object.assign(healthSafety, healthSafetyDto);
    }

    return manager.save(healthSafety);
  }

  /**
   * Updates the travel personalization information for a profile.
   * @param profileId - The ID of the profile.
   * @param personalizationDto - The travel personalization data to update.
   * @param manager
   * @returns The updated travel personalization information.
   */
  private async updatePersonalization(
    profileId: number,
    personalizationDto: TravelPersonalizationDto,
    manager: EntityManager,
  ): Promise<TravelPersonalization> {
    let personalization = await manager.findOneBy(TravelPersonalization, {
      profile: { id: profileId },
    });

    if (!personalization) {
      personalization = manager.create(TravelPersonalization, {
        profile: { id: profileId },
        ...personalizationDto,
      });
    } else {
      Object.assign(personalization, personalizationDto);
    }

    return manager.save(personalization);
  }

  /**
   * Updates the additional details for a profile.
   * @param profileId - The ID of the profile.
   * @param additionalDetails - The additional details data to update.
   * @param manager
   * @returns The updated additional details.
   */
  private async updateAdditionalDetails(
    profileId: number,
    additionalDetails: AdditionalDetailsDto,
    manager: EntityManager,
  ): Promise<AdditionalDetails> {
    let details = await manager.findOneBy(AdditionalDetails, {
      profile: { id: profileId },
    });

    if (!details) {
      details = manager.create(AdditionalDetails, {
        profile: { id: profileId },
        ...additionalDetails,
      });
    } else {
      Object.assign(details, additionalDetails);
    }

    return manager.save(details);
  }

  /**
   * Updates the profile with the provided data.
   *
   * @param profile - The existing profile to update.
   * @param updateProfileDto - The data to update the profile with.
   * @returns The updated profile.
   */
  async updateProfile(
    profile: Profile,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.dataSource.transaction(async (manager: EntityManager) => {
      // Update related entities
      if (updateProfileDto.travel_preferences) {
        await this.updateTravelPreferences(
          profile.id,
          updateProfileDto.travel_preferences,
          manager,
        );
      }

      if (updateProfileDto.health_safety) {
        await this.updateHealthSafety(
          profile.id,
          updateProfileDto.health_safety,
          manager,
        );
      }

      if (updateProfileDto.personalization) {
        await this.updatePersonalization(
          profile.id,
          updateProfileDto.personalization,
          manager,
        );
      }

      if (updateProfileDto.additional_details) {
        await this.updateAdditionalDetails(
          profile.id,
          updateProfileDto.additional_details,
          manager,
        );
      }

      // Update only the fields that are part of the Profile entity
      const { first_name, last_name, gender, birth_date, onboarded } =
        updateProfileDto;

      Object.assign(profile, {
        first_name,
        last_name,
        gender,
        birth_date,
        onboarded,
      });

      return await manager.save(profile);
    });
  }
}
