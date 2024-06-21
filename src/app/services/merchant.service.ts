import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant';
import { Dish } from '../models/dishes';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {


  isRestIdExists: any;

  constructor(private httpclient: HttpClient, private snackBar: MatSnackBar) { }



  register(merchantData: any): Observable<any> {
    return this.httpclient.post(`http://localhost:8088/api/v2/register`, merchantData)
  }

  addRestaurant(restaurant: Restaurant) {
    return this.httpclient.post<any>("http://localhost:8088/api/v2/restaurant/add", restaurant);
  }

  displayRestaurant(): Observable<Restaurant[]> {
    return this.httpclient.get<Restaurant[]>("http://localhost:8088/api/v2/all");
  }

  merchantRestaurant(): Observable<Restaurant[]> {
    return this.httpclient.get<Restaurant[]>("http://localhost:8088/api/v2/restaurant/restaurants");
  }

  editRestaurant(updatedRestaurant: Restaurant) {
    return this.httpclient.put<Restaurant>(`http://localhost:8088/api/v2/restaurant`, updatedRestaurant);
  }

  deleteRestaurantById(restaurantId: Restaurant) {
    return this.httpclient.delete<Restaurant>(`http://localhost:8088/api/v2/restaurant/${restaurantId}`);
  }

  addDish(restaurantId: string, dishes: Dish[]) {
    return this.httpclient.post<Dish[]>(`http://localhost:8088/api/v2/restaurant/${restaurantId}`, dishes);
  }

  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    return this.httpclient.get<Restaurant>(`http://localhost:8088/api/v2/restaurants/${restaurantId}`);
  }

  getDishByDishId(restaurantId: string, dishId: string) {
    const url = `http://localhost:8088/api/v2/restaurant/${restaurantId}/${dishId}`;
    return this.httpclient.get<Dish>(url);
  }


  deleteDishByDishId(restaurantId: string, dishId: string) {
    return this.httpclient.delete<Dish>(`http://localhost:8088/api/v2/restaurant/delete/${restaurantId}/${dishId}`);
  }


  updateDish(restaurantId: string, dishId: string, updatedDish: Dish): Observable<Dish> {
    const url = `http://localhost:8088/api/v2/restaurant/${restaurantId}/dish/${dishId}`;
    return this.httpclient.put<Dish>(url, updatedDish);
  }

  getonedish(restaurantId: string, dishId: string) {
    const url = `http://localhost:8088/api/v2/${restaurantId}/${dishId}`;
    return this.httpclient.get<Dish>(url);
  }

  checkRestaurantExists(restId: string): Observable<boolean> {
    return this.httpclient.get<boolean>(`http://localhost:8088/api/v2/checkRestaurantExists/${restId}`);
  }


  getAllMerchants() {
    return this.httpclient.get("http://localhost:8088/api/v2/allMerchants");
  }

  setStatus(merchantId: any, restaurant: any) {
    return this.httpclient.put("http://localhost:8088/api/v2/setStatus/" + merchantId, restaurant);
  }

  getUser() {
    return this.httpclient.get("http://localhost:8088/api/v2/restaurant/getuserdetails")
  }

}
