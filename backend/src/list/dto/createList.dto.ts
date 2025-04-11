import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateListItemDto } from './createListItem.dto';

export class CreateListDto {
  @IsInt()
  profile_id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_template?: boolean;

  @IsInt()
  @IsOptional()
  template_id?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateListItemDto)
  @IsOptional()
  items?: CreateListItemDto[];
}
