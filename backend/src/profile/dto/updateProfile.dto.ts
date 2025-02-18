import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TravelPreferencesDto {
  @IsOptional()
  @IsString()
  frequency?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  purpose?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  destinations?: string[];
}

export class HealthSafetyDto {
  @IsOptional()
  @IsBoolean()
  allergies?: boolean;

  @IsOptional()
  @IsString()
  preferred_transport?: string;
}

export class TravelPersonalizationDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favorite_activities?: string[];

  @IsOptional()
  @IsString()
  weather_preference?: string;
}

export class AdditionalDetailsDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  travel_companions?: string[];
}

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
  personalization?: TravelPersonalizationDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AdditionalDetailsDto)
  additional_details?: AdditionalDetailsDto;
}
