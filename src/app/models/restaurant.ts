import { Dish } from "./dishes"

export type Restaurant={
   
    restId:string,
    name:string,
    imageUrl:string,
    location:string,
    status?:boolean,
    dishList: Dish[]
}





