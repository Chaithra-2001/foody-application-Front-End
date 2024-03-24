import { Dish } from "./dishes";
import { Restaurant } from "./restaurant";

export type User={
    userEmailId:string,
    password:string,
    userName:string,
    role:string;
    location:string;
    phoneNumber:string,
    restaurants:Restaurant[]
    dishes: Dish[]
}






