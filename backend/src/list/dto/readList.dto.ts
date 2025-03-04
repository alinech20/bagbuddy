import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class ListDto {
  @IsInt()
  id: number;

  @IsInt()
  profile_id: number;

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
