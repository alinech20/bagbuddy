import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ProfileDto } from '../../profile/dto/readProfile.dto';

export class ListDto {
  @IsInt()
  id: number;

  @ValidateNested()
  owner: ProfileDto;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @MaxLength(16)
  status: string;

  @IsBoolean()
  is_template: boolean;

  @IsInt()
  @IsOptional()
  template_id?: number;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}
