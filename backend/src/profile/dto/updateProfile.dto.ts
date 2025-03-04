import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  AdditionalDetailsDto,
  HealthSafetyDto,
  TravelPersonalizationDto,
  TravelPreferencesDto,
} from './other.dto';

export class UpdateProfileDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  birth_date?: Date;

  @IsOptional()
  @IsBoolean()
  onboarded?: boolean;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TravelPreferencesDto)
  travel_preferences?: TravelPreferencesDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HealthSafetyDto)
  health_safety?: HealthSafetyDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TravelPersonalizationDto)
  travel_personalization?: TravelPersonalizationDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AdditionalDetailsDto)
  additional_details?: AdditionalDetailsDto;
}
