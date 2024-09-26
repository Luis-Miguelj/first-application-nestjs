import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class UserTypeBody {
    @IsString()
    @IsNotEmpty()
    @Length(1)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(6)
    password: string;
}