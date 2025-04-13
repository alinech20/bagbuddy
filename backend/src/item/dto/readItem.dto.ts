import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../category/dto/readCategory.dto';

export class ItemDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;

  @IsOptional()
  @IsNumber()
  category_id?: number;
}
