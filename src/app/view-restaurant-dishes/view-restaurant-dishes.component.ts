

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

  

constructor(private ms:MerchantService,private ar:ActivatedRoute,private router:Router,private us:UserService,private snackBar:MatSnackBar,public ass:AuthenticationService){}
  displayRestaurant:Restaurant={
    restId: '',
    name: '',
    imageUrl:'',
    location: '',
    dishList: []
  }

  myfavrestaurant:Favrestaurant={
    restId: '',
    name: '',
    imageUrl:'',
    location: '',
    favoriteDish: []
  }

  myfavdises: favdish={
    dishID:' ',
    name:'',
    imageUrl:'',
    category:'',
    price:0,
    rating:0,
}
  displayOneDish:Dish={
    restId: '',
    dishID: '',
  
    dishname: '',
    imageUrl:'',
    category: '',
    price:0 ,
    rating:0 ,
  
  }
  categories: string[] = ['All', 'Starters', 'Rolls', 'Roti', 'Rice'];
selectedCategory: string = 'All';

  searchString: string = '';

  ngOnInit(): void {
  
    this.ar.paramMap.subscribe(params => {
      const rest = params.get('restId');
      console.log('Received restId:', rest);
 
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

    delete(restaurantId: string, dishId: string) {
      // Show confirmation dialog
      const isConfirmed = confirm('Are you sure you want to delete this dish?');
    
      if (isConfirmed) {
        // Proceed with the deletion if the user confirms
        this.ms.deleteDishByDishId(restaurantId, dishId).subscribe(
          (data) => {
            console.log("deleted");
            // Optionally, show a snack bar notification
            // this.openSnackBar("Deleted successfully");
            this.router.navigateByUrl('/ViewMyRestaurants');
          },
          (error) => {
            console.error('Error deleting dish:', error);
          }
        );
      } else {
        // If the user cancels, log a message or handle as needed
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
  filterdDishes:any=[];
  dishFilter:boolean=false
  
  sortType(type: string) {
    if (type === 'Veg') {
      this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish: any) => dish.category === 'Veg');
      
    } else if (type === 'NonVeg') {
      this.displayRestaurant.dishList = this.displayRestaurant.dishList.filter((dish: any) => dish.category === 'NonVeg');
    
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
    this.menuVisible = !this.menuVisible; // Toggle the visibility of the menu
  }
addtofav() {
  //  alert("u have to login ")
  const newFavRestaurant: Favrestaurant = {
    restId: this.displayRestaurant.restId || '',  
    name: this.displayRestaurant.name || '', 
    imageUrl:this.displayRestaurant.imageUrl||'',     
    location: this.displayRestaurant.location || '',
    favoriteDish: [] 
  };
  if (!this.ass.isUser) {
    // User is not logged in, redirect to the login page
    this.router.navigateByUrl("/Login");
    return;
  }

  this.us.addFavRestaurant(newFavRestaurant).subscribe(
    (data) => {
      console.log('Restaurant added to favorites:', data);
      this.displayRestaurant = data;
      console.log(this.displayRestaurant);
      //this.openSnackBar("Added to favorite restaurant successfully");
      this.router.navigateByUrl("favoriteRestaurant")
    },
    (error) => {
      if (error.status === 409) { // Assuming 409 is the status code for "Restaurant already exists"
        console.error('Error adding to favorites:', error);
       // this.openSnackBar("Restaurant is already in favorites");
      } else {
        console.error('Error adding to favorites:', error);
        //this.openSnackBar("An error occurred while adding to favorites");
      }
    }
  );
  


}
addDishtoFavv(dish: Dish) {
  const newFavDish: favdish = {
    dishID: dish.dishID || '',
    name: dish.dishname || '',
    imageUrl: dish.imageUrl || '',
    category: dish.category || '',
    price: dish.price,
    rating: dish.rating
  };
  
  alert("Dish added to favorites");
  this.us.addDishToFavorites(newFavDish).subscribe(
    (data) => {
      console.log('Dish added to favorites:', data);
      this.snackBar.open('Dish added to favorites successfully', 'Close', {
        duration: 3000,
      });
    },
    (error) => {
      console.error('Error adding dish to favorites:', error);
      this.snackBar.open('Failed to add dish to favorites', 'Close', {
        duration: 3000,
      });
    }
  );
}
cartButton=false


show=false;
searchText:any;
selectedDishes: { name: string, price: number, quantity: number }[] = [];
billAmount: number = 0;
addDishToCart(dish: { name: string, price: number }) {
  this.show=true

  const existingDish = this.selectedDishes.find(item => item.name === dish.name);

  if (existingDish) {

    existingDish.quantity++;
  } else {

    this.selectedDishes.push({ ...dish, quantity: 1 });
  }


  this.calculateBillAmount();
}
calculateBillAmount() {
  this.billAmount = this.selectedDishes.reduce((total, dish) => {
    return total + (dish.price * dish.quantity);
  }, 0);
}
addToMethod(dish:any){
  this.us.addDishTobill(dish)
  this.cartButton=true;

  this.snackBar.open('Dish added To Cart!!', 'success', {​
    duration: 1000,​
     panelClass: ['mat-toolbar', 'mat-primary']

     ​
   });

}




} 



































