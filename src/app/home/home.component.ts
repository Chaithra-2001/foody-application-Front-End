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
  userEmail: any;
  restaurantId: any | string;
  searchString: string = '';
  displayRestaurantss: Restaurant[] = []

  constructor(private ms: MerchantService, private route: Router, private us: UserService, public ass: AuthenticationService, private snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.getAllRestaurants()
  }


  getAllRestaurants() {
    this.ms.displayRestaurant().subscribe(
      (response) => {
        this.displayRestaurantss = response;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }




  navigateToRestaurantDetails(restId: string): void {
    this.route.navigate(['/ViewOneRestaurant', restId]);
  }

  filter() {
    if (this.searchString != "") {
      this.displayRestaurantss = this.displayRestaurantss.filter((data) => {
        return data.name?.toLowerCase().startsWith(this.searchString.toLowerCase());
      });
    }
    else {
      this.getAllRestaurants();
    }
  }


  addtofav(restaurant: Restaurant, event: Event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    const newFavRestaurant: Favrestaurant = {
      restId: restaurant.restId || '',
      name: restaurant.name || '',
      imageUrl: restaurant.imageUrl || '',
      location: restaurant.location || '',
      favoriteDish: []
    };
  
    if (!this.ass.isUser) {
      this.route.navigateByUrl("/Login");
      return;
    }
  
    this.us.addFavRestaurant(newFavRestaurant).subscribe(
      (data) => {
        console.log('restaurant added to favorites:', data);
        this.snackBar.open('restaurant added to favorites successfully', 'Close', {
          duration: 3000,
        });
        this.route.navigateByUrl("/");
      },
      (error) => {
        console.error('Error adding restaurant to favorites:', error);
        this.snackBar.open('restaurant already present favorites', 'Close', {
          duration: 3000,
        });
        this.route.navigateByUrl("/");
      }
    );
  }
  

}
