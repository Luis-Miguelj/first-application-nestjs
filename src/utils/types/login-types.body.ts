import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator'
export class LoginTypesBody {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}