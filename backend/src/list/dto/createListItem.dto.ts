import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateListItemDto {
  @IsInt()
  item_id: number;

  @IsInt()
  @IsOptional()
  priority_id?: number;

  @IsInt()
  @IsOptional()
  quantity?: number;

  @IsInt()
  @IsOptional()
  quantity_prepared?: number;

  @IsInt()
  @IsOptional()
  quantity_to_buy?: number;

  @IsBoolean()
  @IsOptional()
  packed?: boolean;

  @IsBoolean()
  @IsOptional()
  bought?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}
