import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ProfileDto } from '../../profile/dto/readProfile.dto';
import { ListItemDto } from './readListItem.dto';

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

  @ValidateNested({ each: true })
  @IsArray()
  items: ListItemDto[];

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}
