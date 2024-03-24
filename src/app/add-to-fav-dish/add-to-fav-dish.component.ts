import { Component, OnInit } from '@angular/core';
import { favdish } from '../models/favdish';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar, MatSnackBarContainer } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-to-fav-dish',
  templateUrl: './add-to-fav-dish.component.html',
  styleUrl: './add-to-fav-dish.component.css'
})
export class AddToFavDishComponent implements OnInit {
  constructor(private route:Router,private us:UserService,private snackbar:MatSnackBar){}
  ngOnInit(): void {
   this.getAllDishes()
  }

  
  displayDishes: favdish[] = [];

getAllDishes() {
  this.us.getFavDishes().subscribe(
    (response) => {
      this.displayDishes = response; 
    },
    (error) => {
      console.error('Error fetching favorite dishes:', error);
    }
  );
}
// delete(dishId: any) {
//   this.us.deleteDishFromFavorites(dishId).subscribe(
//     (data) => {
//       console.log("Deleted");
//       this.openSnackBar('Deleted successfully');
//       this.route.navigateByUrl('/');
//     },
//     (error) => {
//       console.error('Error deleting dish:', error);
//     }
//   );
// }
deleteDish(dishId: any) {
  this.us.deleteDishFromFavorites(dishId).subscribe(
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
          this.openSnackBar('An unexpected error occurred while deleting the dish.');
        }
      } else {
        console.error('Unexpected error format:', error);
        this.openSnackBar('An unexpected error occurred while deleting the dish.');
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