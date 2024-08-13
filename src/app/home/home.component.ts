import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { MerchantService } from '../services/merchant.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Favrestaurant } from '../models/favrestaurant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allRestaurants: Restaurant[] = [];
  displayedRestaurants: Restaurant[] = [];
  currentPage: number = 0;
  pageSize: number = 6; 
  searchString: string = '';
  totalPages: number = 0;

  constructor(
    private ms: MerchantService,
    private route: Router,
    private us: UserService,
    public ass: AuthenticationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.ms.displayRestaurant().subscribe(
      (response) => {
        this.allRestaurants = response;
        this.totalPages = Math.ceil(this.allRestaurants.length / this.pageSize);
        this.updateDisplayedRestaurants();
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }

  updateDisplayedRestaurants() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.displayedRestaurants = this.allRestaurants.slice(start, end);
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedRestaurants();
    }
  }

  filter() {
    if (this.searchString !== '') {
      this.allRestaurants = this.allRestaurants.filter((data) => {
        return data.name?.toLowerCase().startsWith(this.searchString.toLowerCase());
      });
    } else {
      this.getAllRestaurants();
    }
    this.totalPages = Math.ceil(this.allRestaurants.length / this.pageSize);
    this.updateDisplayedRestaurants();
  }

  navigateToRestaurantDetails(restId: string): void {
    this.route.navigate(['/ViewOneRestaurant', restId]);
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
