import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Dish } from '../models/dishes';
import { ActivatedRoute, Router } from '@angular/router';
import { favdish } from '../models/favdish';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-view-one-dish',
  templateUrl: './view-one-dish.component.html',
  styleUrl: './view-one-dish.component.css'
})

  export class ViewOneDishComponent  implements OnInit{
    
  constructor(private ms:MerchantService,private ar:ActivatedRoute,private router:Router,private us:UserService,private snackbar:MatSnackBar,public ass:AuthenticationService){}

    displayOneDish:Dish={
      restId: '',
      dishID: '',
    
      dishname: '',
      imageUrl:'',
      category: '',
      price:0 ,
      rating:0 ,
    
    }
    ngOnInit(): void {
      const role = sessionStorage.getItem('role'); 
   
      this.ar.paramMap.subscribe(params => {
        const restId = params.get('restId');
        const dishId = params.get('dishID');
  
        if (restId && dishId) {
        this.getDishByDishId(restId, dishId);
        } else {
          console.error('Restaurant ID or Dish ID not provided in the route parameters.');
       
        }
      });
    }
 
  
  
    getDishByDishId(restaurantId: string, dishId: string) {
    this.ms.getonedish(restaurantId, dishId).subscribe(data => {
      this.displayOneDish = data;
    });
  }
  

  addtofav() {
    
    const newFavDish: favdish = {
      dishID: this.displayOneDish.dishID || '',  
      name: this.displayOneDish.dishname || '',  
      imageUrl:this.displayOneDish.imageUrl||' ',
      category: this.displayOneDish.category || '',
      price: this.displayOneDish.price || 0,
      rating: this.displayOneDish.rating || 0
     
    };
  
  
    if (!this.ass.isUser) {
  
      this.router.navigateByUrl("/Login");
      return;
    }
  

  this.us.addDishToFavorites(newFavDish).subscribe(
    (data) => {
      console.log('Dish added to favorites:', data);
      this.openSnackBar('Added to favorite dishes successfully');
    },
    (error) => {
      if (error.status === 409) { 
        console.error('Error adding to favorites:', error);
        this.openSnackBar('Dish is already in favorites');
      } else {
        console.error('Error adding to favorites:', error);
        this.openSnackBar('An error occurred while adding to favorites');
      }
    }
  );
  } 
  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000 
    });
  }
  }