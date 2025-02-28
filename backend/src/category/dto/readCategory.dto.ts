import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ReadCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  @IsOptional()
  @IsNumber()
  parent_id?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReadCategoryDto)
  subcategories?: ReadCategoryDto[];
}
