import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
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
} from './dto/other.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { RegisterProfileDto } from './dto/createProfile.dto';

/**
 * Service to manage default-related operations.
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Creates a new default with the given UID and email.
   * @param profile - The default data to create.
   * @returns The created default.
   */
  async createProfileWithUidAndEmail(
    profile: RegisterProfileDto,
  ): Promise<Profile> {
    const p = this.profileRepository.create(profile);
    return await this.profileRepository.save(p);
  }

  /**
   * Retrieves a default by Firebase UID.
   * @param uid - The Firebase UID of the default.
   * @param fetchRelated - Whether to fetch related entities.
   * @returns The default if found, otherwise null.
   */
  async getProfileByFirebaseUid(
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

    return await this.profileRepository.findOne({
      where: { uid },
      relations,
    });
  }

  /**
   * Retrieves a default by its ID.
   * @param id - The ID of the default.
   * @returns The default if found, otherwise null.
   */
  async getProfileById(id: number): Promise<Profile | null> {
    return await this.profileRepository.findOneBy({ id });
  }

  /**
   * Updates the travel preferences for a default.
   * @param profileId - The ID of the default.
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
   * Updates the health and safety information for a default.
   * @param profileId - The ID of the default.
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
   * Updates the travel personalization information for a default.
   * @param profileId - The ID of the default.
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
   * Updates the additional details for a default.
   * @param profileId - The ID of the default.
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
   * Updates the default with the provided data.
   *
   * @param profile - The existing default to update.
   * @param updateProfileDto - The data to update the default with.
   * @returns The updated default.
   */
  async updateProfile(
    profile: Profile,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.dataSource.transaction(async (manager: EntityManager) => {
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

      if (updateProfileDto.travel_personalization) {
        await this.updatePersonalization(
          profile.id,
          updateProfileDto.travel_personalization,
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
