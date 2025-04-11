import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { ItemDto } from '../../item/dto/readItem.dto';

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
  prepared: boolean;

  @IsBoolean()
  bought: boolean;

  @IsString()
  @IsOptional()
  notes?: string;

  // Include the item data
  item: ItemDto;
}
