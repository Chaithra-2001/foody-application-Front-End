

import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';
import { Favrestaurant } from '../models/favrestaurant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';
import { Dish } from '../models/dishes';
import { favdish } from '../models/favdish';

@Component({
  selector: 'app-view-restaurant-dishes',
  templateUrl: './view-restaurant-dishes.component.html',
  styleUrl: './view-restaurant-dishes.component.css'
})


export class ViewRestaurantDishesComponent implements OnInit {


  searchString: string = '';
  constructor(private ms: MerchantService, private ar: ActivatedRoute, private router: Router, private us: UserService, private snackBar: MatSnackBar, public ass: AuthenticationService) { }
  displayRestaurant: Restaurant = {
    restId: '',
    name: '',
    imageUrl: '',
    location: '',
    dishList: []
  }



  displayOneDish: Dish = {
    restId: '',
    dishID: '',
    dishname: '',
    imageUrl: '',
    category: '',
    price: 0,
    rating: 0,

  }





  ngOnInit(): void {

    this.ar.paramMap.subscribe(params => {
      const rest = params.get('restId');
      this.getOneRestaurantdetails(rest);

    });



  }



  getDishByDishId(restaurantId: string, dishId: string) {
    this.ms.getonedish(restaurantId, dishId).subscribe(data => {
      this.displayOneDish = data;
    });
  }

  getOneRestaurantdetails(id: any) {
    this.ms.getRestaurantById(id).subscribe((data) => {
      this.displayRestaurant = data;
      console.log('Display Restaurant:', this.displayRestaurant);
    });
  }

  // delete(restaurantId: string, dishId: string) {
  //   const isConfirmed = confirm('Are you sure you want to delete this dish?');
  //   if (isConfirmed) {
  //     this.ms.deleteDishByDishId(restaurantId, dishId).subscribe(
  //       (data) => {
  //         console.log("deleted");
  //         this.snackBar.open('Dish deleted Succesfully', 'succes', {
  //           duration: 5000,
  //           panelClass: ['mat-toolbar', 'mat-warn']
  //         });
  //         this.router.navigate(['/ViewOneRestaurant', restaurantId]);
  //       },
  //       (error) => {
  //         console.error('Error deleting dish:', error);
  //       }
  //     );
  //   } else {

  //     console.log('Deletion cancelled by user');
  //   }
  // }
  delete(restaurantId: string, dishId: string) {
    const isConfirmed = confirm('Are you sure you want to delete this dish?');
    if (isConfirmed) {
      this.ms.deleteDishByDishId(restaurantId, dishId).subscribe(
        (data) => {
          console.log("deleted");
          this.snackBar.open('Dish deleted successfully', 'success', {
            duration: 5000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
          // Remove the deleted dish from the list
          this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter(dish => dish.dishID !== dishId);
      
        },
        (error) => {
          console.error('Error deleting dish:', error);
        }
      );
    } else {
      console.log('Deletion cancelled by user');
    }
  }




  navigateToDetails(restId: string, dishId: string): void {
    this.router.navigate(['/ViewOneDish', restId, dishId]);
  }


  filter() {
    if (this.searchString !== "") {
      this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish) => {
        return dish.dishname?.toLowerCase().startsWith(this.searchString.toLowerCase());
      });
    } else {

      this.getOneRestaurantdetails(this.displayRestaurant.restId);
    }
  }

  filterdDishes: any = [];
  dishFilter: boolean = false

  sortType(type: string) {
    if (type === 'Veg') {
      this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish: any) => dish.category === 'Veg');

    } else if (type === 'Non-Veg') {
      this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish: any) => dish.category === 'Non-Veg');

    } else {
      this.getOneRestaurantdetails(this.displayRestaurant.restId); // Reset to all dishes
    }
  }

  sortPrice(order: string) {
    if (order === 'Highest') {
      this.displayRestaurant.dishList.sort((a: any, b: any) => b.price - a.price);
    } else if (order === 'Lowest') {
      this.displayRestaurant.dishList.sort((a: any, b: any) => a.price - b.price);
    }
  }
  displayMenu() {
    this.displayRestaurant.dishList.forEach((dish) => {
      console.log(`Dish Name: ${dish.dishname}, Price: ${dish.price}`);
    });
  }
  menuVisible: boolean = false;
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  addDishtoFavv(dish: Dish) {
    const newFavDish: favdish = {
      dishID: dish.dishID || '',
      dishname: dish.dishname || '',
      imageUrl: dish.imageUrl || '',
      category: dish.category || '',
      price: dish.price,
      rating: dish.rating
    };
    if (!this.ass.isUser) {

      this.router.navigateByUrl("/Login");
      return;
    }
   
    this.us.addDishToFavorites(newFavDish).subscribe(
      (data) => {
        console.log('Dish added to favorites:', data);
        this.snackBar.open('Dish added to favorites successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error adding dish to favorites:', error);
        this.snackBar.open(' dish already in  favorites', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  addtocart(dish: any): void {
    if (
      !this.ass.isUser) {
      this.router.navigateByUrl("/Login");
      return;
    }
    this.us.addToCart(dish);
    this.snackBar.open('Dish added to cart!', 'Close', { duration: 2000 });
  }

}



































