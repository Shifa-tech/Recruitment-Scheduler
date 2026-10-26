import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsArray } from 'class-validator';
import { Role } from '../../users/user.entity'; // Import Role from where we defined it

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  @IsArray()
  skills?: string[];
}