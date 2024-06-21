import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-view-my-restaurants',
  templateUrl: './view-my-restaurants.component.html',
  styleUrl: './view-my-restaurants.component.css',

})
export class ViewMyRestaurantsComponent {
  restaurantId: any | string;
  searchString: string = '';
  displayRestaurantss: Restaurant[] = []
  dataloaded: boolean = false;
  favDishh = true;

  constructor(private ms: MerchantService, private router: Router, private snackbar: MatSnackBar, public ass: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllRestaurantsss()
  }



  getAllRestaurantsss() {
    this.ms.merchantRestaurant().subscribe(
      (response) => {
        this.displayRestaurantss = response;
        this.dataloaded = true;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
        this.dataloaded = true;
      }
    );
  }

  deleteRestaurant(restId: any) {
    const isConfirmed = confirm('Are you sure you want to delete this restaurant?');
    if (isConfirmed) {
      this.ms.deleteRestaurantById(restId).subscribe(data => {
        this.snackbar.open('Restaurant deleted Succesfully', 'succes', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-warn']
        });
        this.router.navigateByUrl("/ViewMyRestaurants")
      })
    } else {
      this.snackbar.open('Not able to delete restaurant ', 'succes', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
    }
  }



  navigateToRestaurantDetails(restId: string): void {
    this.router.navigate(['/ViewOneRestaurant', restId]);
  }


  displayMessage() {
    if (this.displayRestaurantss.length == 0) {
      this.favDishh = false;
      return false;
    } else
      this.favDishh = true;
    return true;
  }


}
