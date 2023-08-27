import {  IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class studentDto {
    @IsNotEmpty()
    @IsString()
    fullName: string;

    @IsNotEmpty()
    email: string;

    @IsOptional()
    country: string

    @IsOptional()
    sex: string

    @IsOptional()
    Kirat_type: string

    @IsOptional()
    Surah_name: string

    @IsOptional()
    ayah_number: number

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    classId: string;
    isSaved: boolean;
    isPresent: boolean;

    newemail: string;
    newpassword: string;
    avatarUrl: string;
}