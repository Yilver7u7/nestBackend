import { User } from "../entities/user.entity";

//Type of the response to our request
export interface LoginResponse{
    user: User;
    token:string;
}

