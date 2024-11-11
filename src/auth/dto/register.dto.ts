import { IsEmail, IsString } from "class-validator";

//This is the info that I send when I need to create a new user into the db
export class RegisterDto {

    // Con esos pipes tipamos para validar o invalidar directamente el valor antes de grabarlo en la db 
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;

}
