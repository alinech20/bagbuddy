import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
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

  @IsDate()
  @Type(() => Date)
  created_at: Date;

  @IsDate()
  @Type(() => Date)
  updated_at: Date;
}
