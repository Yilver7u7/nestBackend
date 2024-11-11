import { IsEmail, MinLength } from "class-validator";

export class LoginDto {
    
    @IsEmail()
    // This will validate that the input is a valid email address.
    email: string;

    @MinLength(3)
    password: string;
}

