import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

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
}
