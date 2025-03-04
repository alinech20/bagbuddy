import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Country } from '../entities/Country';
import {
  AdditionalDetailsDto,
  HealthSafetyDto,
  TravelPersonalizationDto,
  TravelPreferencesDto,
} from './other.dto';

class ProfileStatusDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ProfileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birth_date?: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => Country)
  country?: Country;

  @IsBoolean()
  onboarded: boolean;

  @ValidateNested()
  @Type(() => ProfileStatusDto)
  status: ProfileStatusDto;

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  @IsOptional()
  @ValidateNested()
  @Type(() => TravelPreferencesDto)
  travel_preferences?: TravelPreferencesDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => HealthSafetyDto)
  health_safety?: HealthSafetyDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => TravelPersonalizationDto)
  travel_personalization?: TravelPersonalizationDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdditionalDetailsDto)
  additional_details?: AdditionalDetailsDto;
}
