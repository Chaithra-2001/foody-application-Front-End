import { Component, Input, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userEmail:any;
  restaurantId: any|string;
  constructor(private ms:MerchantService,private route:Router,private us:UserService){}




   ngOnInit(): void {
   
    this.getAllRestaurants()
   }
 
   searchString: string = '';
   



   displayRestaurantss:Restaurant[]=[]
  
   // getAllRestaurants() {
   //   this.restaurantservice.displayRestaurant().subscribe(
   //     (response) => {
   //       this.displayRestaurantss=response
   //     },
   //     (error) => {
   //       console.error('Error fetching restaurants:', error);
   //     }
   //   );
   // }
   getAllRestaurants() {
     this.ms.displayRestaurant().subscribe(
       (response) => {
         this.displayRestaurantss = response;  // Use response.body to access the data
       },
       (error) => {
         console.error('Error fetching restaurants:', error);
       }
     );
   }
   
 
  //  deleteRestaurant(id:any){
  //    this.restaurantservice.deleteRestaurantById(id).subscribe(data=>{
  //      alert("deleted succesfully")
  //    })
  //  }
 
   navigateToRestaurantDetails(restId: string): void {
     this.route.navigate(['/ViewOneRestaurant', restId]);
   }
   
 filter() {
 if(this.searchString!="")
 {
   this.displayRestaurantss= this.displayRestaurantss.filter((data) => {
     return data.name?.toLowerCase().startsWith(this.searchString.toLowerCase());
   });
 }
   else{
     this.getAllRestaurants();
   }
 }

 addFavoriteRestaurant(restaurant: any): void {
 // Replace with the actual user ID
  this.us.addFavRestaurant( restaurant).subscribe(
    () => {
      alert('Restaurant added to favorites successfully!');
    },
    (error) => {
      console.error('Error adding restaurant to favorites:', error);
    }
  );
}



}
