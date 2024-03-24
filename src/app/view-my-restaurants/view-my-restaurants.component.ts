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
  restaurantId: any|string;
  constructor(private ms:MerchantService,private router:Router,private snackbar:MatSnackBar,public ass:AuthenticationService){}
   ngOnInit(): void {


    this.getAllRestaurantsss()
    // this.deleteRestaurant(restId:any)
   }
 
   searchString: string = '';
 
   displayRestaurantss:Restaurant[]=[]
 
 
   getAllRestaurantsss() {
     this.ms.merchantRestaurant().subscribe(
       (response) => {
         this.displayRestaurantss = response;  // Use response.body to access the data
       },
       (error) => {
         console.error('Error fetching restaurants:', error);
       }
     );
   }
   deleteRestaurant(restId:any){
    this.ms.deleteRestaurantById(restId).subscribe(data=>{
    
      this.snackbar.open('Restaurant deleted Succesfully', 'succes', {
        duration: 5000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      this.router.navigateByUrl("/ViewMyRestaurants")
    })
  }
   
  navigateToRestaurantDetails(restId: string): void {
    this.router.navigate(['/ViewOneRestaurant', restId]);
  }
  



}
