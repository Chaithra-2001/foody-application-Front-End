import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Favrestaurant } from '../models/favrestaurant';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-to-fav-restaurant',
  templateUrl: './add-to-fav-restaurant.component.html',
  styleUrl: './add-to-fav-restaurant.component.css'
})
export class AddToFavRestaurantComponent implements OnInit {
  constructor(private route:Router,private us:UserService,private snackbar:MatSnackBar){}
  ngOnInit(): void {
   this.getAllRestaurants()
  }

  searchString: string = '';

  displayRestaurantss:Favrestaurant[]=[]
  getAllRestaurants() {
    this.us.getFavRestaurant().subscribe(
      (response) => {
        this.displayRestaurantss = response; 
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }
  // delete(restaurantId: any) {
  //   this.us.deletefavRestaurantById(restaurantId).subscribe(
      
  //     (data) => {
  //       console.log("deleted")
  //       alert('Deleted successfully');
    
  //       this.route.navigateByUrl('/');
  //     },
  //     (error) => {
  //       console.error('Error deleting dish:', error);
   
  //     }
  //   );
  // }
  delete(restaurantId: any) {
    this.us.deletefavRestaurantById(restaurantId).subscribe(
      () => {
        console.log('Deleted successfully');
        this.openSnackBar('Deleted successfully');
        this.route.navigateByUrl('/');
      },
      (error) => {
        console.error('Error deleting dish:', error);
        if (error instanceof HttpErrorResponse) {
          if (error.status === 200 && error.statusText === 'OK') {
            // Handle non-JSON response (assuming it indicates success)
            console.log('Deleted successfully (non-JSON response)');
            this.openSnackBar('Deleted successfully');
            this.route.navigateByUrl('/');
          } else {
            console.error('Unexpected error:', error);
            this.openSnackBar('An unexpected error occurred while deleting the restaurant.');
          }
        } else {
          console.error('Unexpected error format:', error);
          this.openSnackBar('An unexpected error occurred while deleting the restaurant.');
        }
      }
    );
  }
  
  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }


}