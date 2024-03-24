import { Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Restaurant } from '../models/restaurant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.css'
})
export class EditRestaurantComponent {
  id?: number;
  editform: FormGroup;  // Define the FormGroup here

  constructor(
    private ms: MerchantService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formbuilder: FormBuilder,
    private snackbar:MatSnackBar
  ) {
    // Initialize the FormGroup in the constructor
    this.editform = this.formbuilder.group({
      restId: '',
      name: '',
      location: '',
      dishList: []
    });
  }


// //   // ngOnInit(): void {
// //   //   this.activatedRoute.paramMap.subscribe(params => {
// //   //     let id = params.get("id") ?? 0;
// //   //     this.cakeserv.getCake(+id).subscribe(data => {
// //   //       this.mycake = data;
// //   //     })
// //   //   })
// //   // }
ngOnInit(): void {
  this.activatedRoute.paramMap.subscribe(params => {
    const idParam = params.get('id');
    if (idParam !== null) {
      const id = +idParam; // Convert idParam to a number
      if (!isNaN(id)) {
        this.id = id; // Assign the value to the class property
        this.getRestaurantDetails(id);
      } else {
        console.error('Invalid id parameter:', idParam);
      }
    } else {
      console.error('No id parameter provided.');
    }
  });
}


// getRestaurantDetails(id: number): void {
//   this.ms.merchantRestaurant().subscribe(data => {
//     this.editform.patchValue(data); // Update the form with fetched data
//   }, error => {
//     console.error('Error fetching restaurant details:', error);
//   });
// }
getRestaurantDetails(id: number): void {
  this.ms.merchantRestaurant().subscribe(
    (data: Restaurant[]) => {
      const restaurant = data.find((r: Restaurant) => r.restId === id.toString());
      if (restaurant) {
        this.editform.patchValue(restaurant); // Update the form with fetched data
      } else {
        console.error('Restaurant not found with id:', id);
      }
    },
    (error) => {
      console.error('Error fetching restaurant details:', error);
    }
  );
}

  editRestaurant() {
    if (this.id) {
      this.ms.editRestaurant( this.editform.value).subscribe(data => {
        // Handle success or perform any additional actions
        console.log('Restaurant edited successfully:', data);
        this.openSnackBar("Restaurant edited successfully:");
        this.router.navigateByUrl('/ViewMyRestaurants');
      }, error => {
        // Handle error
        console.error('Error editing restaurant:', error);
        this.openSnackBar("Error editing restaurant");
      });
    } else {
      console.error('ID is undefined. Cannot edit restaurant.');
      this.openSnackBar("ID is undefined. Cannot edit restaurant");
    }
   }

  editRestaurants: Restaurant = {
    restId: '',
    name: '',
    location: '',
    dishList: []
  };

  canClose() {
    if (this.editform.dirty && this.editform.invalid) {
      let display = confirm("Changes you have made may not be saved! Please confirm");
      return display;
    }
    else {
      return true;
    

  }
}

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000 // Duration for which the snackbar will be displayed (in milliseconds)
    });
  }

  }
