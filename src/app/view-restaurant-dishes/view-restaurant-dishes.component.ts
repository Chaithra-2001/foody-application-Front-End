

import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { UserService } from '../services/user.service';
import { Favrestaurant } from '../models/favrestaurant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-view-restaurant-dishes',
  templateUrl: './view-restaurant-dishes.component.html',
  styleUrl: './view-restaurant-dishes.component.css'
})


export class ViewRestaurantDishesComponent implements OnInit {

  

constructor(private ms:MerchantService,private ar:ActivatedRoute,private router:Router,private us:UserService,private snackBar:MatSnackBar,public ass:AuthenticationService){}
  displayRestaurant:Restaurant={
    restId: '',
    name: '',
    location: '',
    dishList: []
  }

  myfavrestaurant:Favrestaurant={
    restId: '',
    name: '',
    location: '',
    favoriteDish: []
  }

  categories: string[] = ['All', 'Starters', 'Rolls', 'Roti', 'Rice'];
selectedCategory: string = 'All';

  searchString: string = '';
  ngOnInit(): void {
    // const role = sessionStorage.getItem('role'); // Retrieve role from session storage
    // if (role === 'Admin') {
    //   this.isAdmin = true;
    // } else if (role === 'User') {
    //   this.isUser = true;
    // }
    this.ar.paramMap.subscribe(params => {
      const rest = params.get('restId');
      console.log('Received restId:', rest);
 
        this.getOneRestaurantdetails(rest);
      
    });
  }

  getOneRestaurantdetails(id: any) {
      this.ms.getRestaurantById(id).subscribe((data) => {
        this.displayRestaurant = data;
        console.log('Display Restaurant:', this.displayRestaurant);
      });
    }

  delete(restaurantId: string, dishId: string) {
    this.ms.deleteDishByDishId(restaurantId, dishId).subscribe(
      (data) => {
        console.log("deleted")
   this.openSnackBar("Deleted successfully");
        this.router.navigateByUrl('/ViewMyRestaurants');
      },
      (error) => {
        console.error('Error deleting dish:', error);
     
      }
    );
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


addtofav() {
  //  alert("u have to login ")
  const newFavRestaurant: Favrestaurant = {
    restId: this.displayRestaurant.restId || '',  
    name: this.displayRestaurant.name || '',      
    location: this.displayRestaurant.location || '',
    favoriteDish: [] 
  };

  
  // if (!newFavRestaurant.restId || !newFavRestaurant.name || !newFavRestaurant.location) {
  //   console.error('One or more required fields are null');

  //   return;
  // }
  if (!this.ass.isUser) {
    // User is not logged in, redirect to the login page
    this.router.navigateByUrl("/Login");
    return;
  }
  // this.us.addFavRestaurant(newFavRestaurant).subscribe(
  //   (data) => {
  //     this.displayRestaurant = data;
  //     console.log(this.displayRestaurant);
  //     this.openSnackBar("Added to favorite restaurant successfully");
  
  // this.router.navigateByUrl("/favoriteRestaurant")
  //   },
  //   (error) => {
  //     console.error('Error adding to favorites:', error);
      
  //   }
  // );
  this.us.addFavRestaurant(newFavRestaurant).subscribe(
    (data) => {
      console.log('Restaurant added to favorites:', data);
      this.displayRestaurant = data;
      console.log(this.displayRestaurant);
      this.openSnackBar("Added to favorite restaurant successfully");
      this.router.navigateByUrl("favoriteRestaurant")
    },
    (error) => {
      if (error.status === 409) { // Assuming 409 is the status code for "Restaurant already exists"
        console.error('Error adding to favorites:', error);
        this.openSnackBar("Restaurant is already in favorites");
      } else {
        console.error('Error adding to favorites:', error);
        this.openSnackBar("An error occurred while adding to favorites");
      }
    }
  );
  


}
openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 5000 // Duration for which the snackbar will be displayed (in milliseconds)
  });
}

filterByCategory() {
  if (this.selectedCategory === 'all') {
    this.getOneRestaurantdetails(this.displayRestaurant.restId);
  } else {
    this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish) => {
      return dish.category.toLowerCase() === this.selectedCategory.toLowerCase();
    });
  }
}

// filterByCategory() {
//   console.log('Selected Category:', this.selectedCategory);
//   this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish) => {
//     console.log('Dish Category:', dish.category);
//     return dish.category.toLowerCase() === this.selectedCategory.toLowerCase();
//   });
// }




}


