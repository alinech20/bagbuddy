import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ItemDto } from '../../item/dto/readItem.dto';
import { Type } from 'class-transformer';

export class ListItemDto {
  @IsInt()
  id: number;

  @IsInt()
  priority_id: number;

  @IsInt()
  quantity: number;

  @IsInt()
  quantity_prepared: number;

  @IsInt()
  quantity_to_buy: number;

  @IsBoolean()
  packed: boolean;

  @IsBoolean()
  bought: boolean;

  @IsString()
  @IsOptional()
  notes?: string;

  @ValidateNested()
  @Type(() => ItemDto)
  item: ItemDto;

  @IsString()
  created_at: string;

  @IsString()
  updated_at: string;
}
