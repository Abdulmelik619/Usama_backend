import { IsAlpha, IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {

    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;

}