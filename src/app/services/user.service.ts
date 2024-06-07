import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
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
    // this.token = sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  login(credentials: any): Observable<HttpResponse<any>> {
    return this.httpclient.post<any>("http://localhost:8088/api/v1/login", credentials)
    }

        register(userData: any): Observable<any> {
         return this.httpclient.post(`http://localhost:8088/api/v3/register`, userData)
         }


        addFavRestaurant( restaurant: any): Observable<any> {
          const url = `http://localhost:8088/api/v3/user/add-restaurant`;
          return this.httpclient.post(url, restaurant);
        }

        addFavDish( dish: any): Observable<any> {
          const url = `http://localhost:8088/api/v3/user/dishes/add`;
          return this.httpclient.post(url,dish);
        }
        getFavRestaurant(): Observable<Favrestaurant[]> {
          const url = `http://localhost:8088/api/v3/user/favget`;
          return this.httpclient.get<Favrestaurant[]>(url);  // Specify the type for the response
        }

   
        deletefavRestaurantById(restaurantId:string){
    return this.httpclient.delete(`http://localhost:8088/api/v3/user/deletefavRestaurant/${restaurantId}`);
    }

    addDishToFavorites(dish:any): Observable<any> {
      const url = `http://localhost:8088/api/v3/user/add-dish`;
          return this.httpclient.post(url, dish);}


getFavDishes(): Observable<favdish[]> {
  const url = `http://localhost:8088/api/v3/user/favget-dishes`; 
  return this.httpclient.get<favdish[]>(url);  
}

deleteDishFromFavorites(dishID:string){
  return this.httpclient.delete(`http://localhost:8088/api/v3/user/deletefavDish/${dishID}`);
}

// getUser():Observable<User>{
//   const url = `http://localhost:8088/api/v3/user/getuserdetails`; 
//   return this.httpclient.get<User>(url);   
// }
getUser(){
  let httpHeaders = new HttpHeaders({
    'authorization': 'Bearer ' +localStorage.getItem('token'),
  })
  let requestOption={headers:httpHeaders}
  return this.httpclient.get("http://localhost:8088/api/v3/user/getuserdetails",requestOption)
}

emptyList=[]
cancelOrder(){
  alert("afaf")
  this.selectedDish=this.emptyList;

}
dishNull(){
  this.selectedDish=[]
}

  selectedDish: { name: string, price: number, quantity: number,cuisine:string,imageUrl:string }[] = [];
  billAmount: number = 0;
  addDishTobill(dish: { name: string, price: number,cuisine:string,imageUrl:string }) {
    const existingDish = this.selectedDish.find(item => item.name === dish.name);
    if (existingDish) {
      existingDish.quantity++;
    } else {
      this.selectedDish.push({ ...dish, quantity: 1 });
    }
  this.calculateBillAmount()
  }
  calculateBillAmount() {
    this.billAmount = this.selectedDish.reduce((total, dish) => {
      return total + (dish.price * dish.quantity);
    }, 0);
  }

  sendMail( details:any){
 
    return this.httpclient.post("http://localhost:9002/mail/sendMail",details);
  }



addOrder(order:any,date:any,bill:any){
  
  console.log(order);

  return this.httpclient.post("http://localhost:8088/api/v3/userOrder/user/addOrder/"+date+"/"+bill ,order);

}


}
