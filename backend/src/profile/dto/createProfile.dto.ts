import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterProfileDto {
  @IsNotEmpty()
  @IsString()
  uid: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumber()
  status_id: number;
}
