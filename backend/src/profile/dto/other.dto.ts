import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

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
