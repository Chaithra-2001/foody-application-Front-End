import { Dish } from "./dishes"

export type Favrestaurant={
   
    restId:string,
    name:string,
  imageUrl:string,
    location:string,
    favoriteDish:Dish[]
 
}