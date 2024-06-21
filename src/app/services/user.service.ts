import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { Favrestaurant } from '../models/favrestaurant';
import { favdish } from '../models/favdish';
import { User } from '../models/user';
import { Dish } from '../models/dishes';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private token: string | null = null;

  constructor(private httpclient: HttpClient, private snackBar: MatSnackBar) {

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

  register(userData: any): Observable<any> {
    return this.httpclient.post(`http://localhost:8088/api/v3/register`, userData)
  }
  
  addFavRestaurant(restaurant: any): Observable<any> {
    const url = `http://localhost:8088/api/v3/user/add-restaurant`;
    return this.httpclient.post(url, restaurant);
  }

  addFavDish(dish: any): Observable<any> {
    const url = `http://localhost:8088/api/v3/user/dishes/add`;
    return this.httpclient.post(url, dish);
  }

  getFavRestaurant(): Observable<Favrestaurant[]> {
    const url = `http://localhost:8088/api/v3/user/favget`;
    return this.httpclient.get<Favrestaurant[]>(url);
  }


  deletefavRestaurantById(restaurantId: string) {
    return this.httpclient.delete(`http://localhost:8088/api/v3/user/deletefavRestaurant/${restaurantId}`);
  }

  addDishToFavorites(dish: any): Observable<any> {
    const url = `http://localhost:8088/api/v3/user/add-dish`;
    return this.httpclient.post(url, dish);
  }


  getFavDishes(): Observable<favdish[]> {
    const url = `http://localhost:8088/api/v3/user/favget-dishes`;
    return this.httpclient.get<favdish[]>(url);
  }

  deleteDishFromFavorites(dishID: string) {
    return this.httpclient.delete(`http://localhost:8088/api/v3/user/deletefavDish/${dishID}`);
  }


  getUser() {
   return this.httpclient.get("http://localhost:8088/api/v3/user/getuserdetails")
  }

  clearCart() {
    this.cartItems.next([]);
  }

  addOrder(order: any, date: any, bill: any) {

    console.log(order);

    return this.httpclient.post("http://localhost:8088/api/v3/user/addOrder/" + date + "/" + bill, order);

  }
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(item: any) {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, item]);
  }

  getCartItems() {
    return this.cartItems.value;
  }

  removeFromCart(item: any) {
    const currentItems = this.cartItems.value;
    this.cartItems.next(currentItems.filter(cartItem => cartItem.dishID !== item.dishID));
  }


  getorder(): Observable<any> {
    return this.httpclient.get("http://localhost:8088/api/v3/user/getAllOrders")
  }

 updateCart(items: any[]) {
    this.cartItems.next(items);
  }

  private apiUrl = 'http://localhost:8088/api/v3/user';
  deleteOrder(orderId: any): Observable<void> {
    return this.httpclient.delete<void>(`${this.apiUrl}/deleteOrder/${orderId}`);
  }

}
