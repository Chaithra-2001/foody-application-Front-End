import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { Dish } from '../models/dishes';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  private token: string | null = null;
  isRestIdExists: any;
 
  constructor(private httpclient: HttpClient, private snackBar: MatSnackBar) {
    // this.token = sessionStorage.getItem('token');
  }

  // setToken(token: string): void {
  //   this.token = token;
  //   sessionStorage.setItem('token', token);
  // }

  // getToken(): string | null {
  //   return this.token;
  // }

  // login(credentials: any): Observable<HttpResponse<any>> {
  //   return this.httpclient.post<any>("http://localhost:8088/api/v1/login", credentials)
  //   }

    register(merchantData: any): Observable<any> {
      return this.httpclient.post(`http://localhost:8088/api/v2/register`, merchantData)
        
    }
   addRestaurant( restaurant: Restaurant) {
     return this.httpclient.post<any>("http://localhost:8088/api/v2/restaurant/add", restaurant);
     }

     displayRestaurant(): Observable<Restaurant[]> {
      return this.httpclient.get<Restaurant[]>("http://localhost:8088/api/v2/all");
    }

    merchantRestaurant():Observable<Restaurant[]>{
      return this.httpclient.get<Restaurant[]>("http://localhost:8088/api/v2/restaurant/restaurants");
    }

    editRestaurant( updatedRestaurant: Restaurant){
    return this.httpclient.put<Restaurant>(`http://localhost:8088/api/v2/restaurant`, updatedRestaurant);
    }

    deleteRestaurantById(restaurantId:Restaurant){
      // const headers = { 'Authorization': `Bearer ${this.getToken()}` };
    return this.httpclient.delete<Restaurant>(`http://localhost:8088/api/v2/restaurant/${restaurantId}`);
    }
    addDish(restaurantId: string,  dishes: Dish[]) {
      return this.httpclient.post<Dish[]>(`http://localhost:8088/api/v2/restaurant/${restaurantId}`,dishes);
    }

    getRestaurantById(restaurantId: string): Observable<Restaurant> {
      return this.httpclient.get<Restaurant>(`http://localhost:8088/api/v2/restaurants/${restaurantId}`);
    }

    getDishByDishId(restaurantId: string, dishId: string) {
      const url = `http://localhost:8088/api/v2/restaurant/${restaurantId}/${dishId}`;
      return this.httpclient.get<Dish>(url);
    }
   
    
    deleteDishByDishId(restaurantId: string, dishId: string){

    return this.httpclient.delete<Dish>(`http://localhost:8088/api/v2/restaurant/delete/${restaurantId}/${dishId}`);
    }


    updateDish(restaurantId: string, dishId: string, updatedDish: Dish): Observable<Dish> {
      // const headers = { 'Authorization': `Bearer ${this.getToken()}` };
      const url = `http://localhost:8088/api/v2/restaurant/${restaurantId}/dish/${dishId}`;
      return this.httpclient.put<Dish>(url, updatedDish);//@PutMapping("/restaurant/{restId}/dishes/update/{dishId}")
    }

    getonedish(restaurantId: string, dishId: string) {
      const url = `http://localhost:8088/api/v2/${restaurantId}/${dishId}`;
      return this.httpclient.get<Dish>(url);
    }


    checkRestaurantExists(restId: string): Observable<boolean> {
      return this.httpclient.get<boolean>(`http://localhost:8088/api/v2/checkRestaurantExists/${restId}`);
    }
}
