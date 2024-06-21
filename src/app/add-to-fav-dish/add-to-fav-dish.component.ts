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

  displayDishes: favdish[] = [];
  dataloded: boolean = false;
  favDishh = true;


  constructor(private route: Router, private us: UserService, private snackbar: MatSnackBar) { }
  ngOnInit(): void {
    this.getAllDishes()
  }



  getAllDishes() {
    this.us.getFavDishes().subscribe(
      (response) => {
        this.displayDishes = response;
        this.dataloded = true

      },
      (error) => {
        console.error('Error fetching favorite dishes:', error);
        this.dataloded = true
      }
    );
  }

  displayMessage() {
    if (this.displayDishes.length == 0) {
      this.favDishh = false;
      return false;

    } else
      this.favDishh = true;

    return true;
  }
  deleteDish(dishId: any) {
    const isConfirmed = confirm('Are you sure you want to delete this dish from your favorite?');
    if (isConfirmed) {
      this.us.deleteDishFromFavorites(dishId).subscribe(
        () => {
          console.log('Deleted successfully');
          this.openSnackBar('Deleted successfully');
          this.getAllDishes()
          this.route.navigateByUrl('/favoriteDish');
        },
        (error) => {
          console.error('Error deleting dish:', error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 200 && error.statusText === 'OK') {
             
              console.log('Deleted successfully (non-JSON response)');
              this.openSnackBar('Deleted successfully');
              this.getAllDishes()
              this.route.navigateByUrl('/favoriteDish');
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
  }


  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}