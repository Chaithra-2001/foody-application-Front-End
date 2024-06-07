import { Component, Input, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Favrestaurant } from '../models/favrestaurant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userEmail:any;
  restaurantId: any|string;
  constructor(private ms:MerchantService,private route:Router,private us:UserService,public ass:AuthenticationService,private snackBar:MatSnackBar){
    
  }




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
addtofav(restaurant:Restaurant){
  const newFavRestaurant: Favrestaurant = {


    restId: restaurant.restId || '',  
    name: restaurant.name || '', 
    imageUrl:restaurant.imageUrl||'',     
    location: restaurant.location || '',
    favoriteDish: [] 



  };
  if (!this.ass.isUser) {
    // User is not logged in, redirect to the login page
    this.route.navigateByUrl("/Login");
    return;
  }
  alert("Dish added to favorites");
  this.us.addFavRestaurant(newFavRestaurant).subscribe(
    (data) => {
      console.log('Dish added to favorites:', data);
      this.snackBar.open('Dish added to favorites successfully', 'Close', {
        duration: 3000,
      });
      this.route.navigateByUrl("/")
    },
    (error) => {
      console.error('Error adding dish to favorites:', error);
      this.snackBar.open('Failed to add dish to favorites', 'Close', {
        duration: 3000,
      });
      this.route.navigateByUrl("/")
    }
  );
}


}
