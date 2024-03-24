// // import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MerchantService } from '../services/merchant.service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Route, Router } from '@angular/router';
// import { Component } from '@angular/core';
// import { catchError, throwError } from 'rxjs';

// @Component({
//   selector: 'app-add-restaurant',
//   templateUrl: './add-restaurant.component.html',
//   styleUrl: './add-restaurant.component.css'
// })
// export class AddRestaurantComponent {
//   userForm!: FormGroup;
//   merchantEmail:string | undefined|null;
//   constructor(private fb: FormBuilder, private ms:MerchantService,private snackbar: MatSnackBar,public router:Router) {}

//   ngOnInit() {
//     this.userForm = this.fb.group({
//       restId: ['', Validators.required],
//       name: ['', Validators.required],
//       location: ['', Validators.required],
//     });

   
//   }
//   get restId(){
//     return this.userForm.get("restId");
//   }
//   get name(){
//     return this.userForm.get("name");
//   }
//   get location(){
//     return this.userForm.get("location");
//   }



   
//   // addRestaurant() {
//   //   this.ms.addRestaurant(this.userForm.value).subscribe(
//   //     () => {
//   //       this.openSnackBar("Restaurant added successfully");
//   //       this.router.navigateByUrl('/ViewMyRestaurants');
//   //     },
//   //     (error) => {
//   //       console.error("Error adding restaurant:", error);
//   //          }
//   //   );
//   // }
//   // addRestaurant() {
//   //   this.ms.addRestaurant(this.userForm.value).subscribe(
//   //     () => {
//   //       this.openSnackBar("Restaurant added successfully");
//   //       this.router.navigateByUrl('/ViewMyRestaurants');
//   //     },
//   //     (error) => {
//   //       if (error && error.error && error.error.error === "Restaurant ID already exists") {
//   //         this.openSnackBar("A restaurant with the same ID already exists. Please use a different ID.");
//   //       } else {
//   //         console.error("Error adding restaurant:", error);
//   //         this.openSnackBar("A restaurant with the same ID already exists. Please use a different ID.");
//   //       }
//   //     }
//   //   );
//   // }
//   // addRestaurant() {
//   //   this.ms.addRestaurant(this.userForm.value).pipe(
//   //     catchError((error) => {
//   //       if (error.status === 409) { // Assuming 409 is the status code for RestaurantAlreadyExistException
         
//   //         this.snackBar.open('"A restaurant with the same name already exists. Please use a different name."', 'error', {
//   //           duration: 5000,
//   //           panelClass: ['mat-toolbar', 'mat-warn']
//   //         });
//   //       } else {
//   //         console.error("Error adding restaurant:", error);
         
//   //         this.snackBar.open('An error occurred while adding the restaurant.', 'error', {
//   //           duration: 5000,
//   //           panelClass: ['mat-toolbar', 'mat-warn']
//   //         }); 
//   //       }
//   //       return throwError(error); // Rethrow the error to propagate it to the subscriber
//   //     })
//   //   ).subscribe(
//   //     () => {
      
          
//   //       this.snackBar.open('Restaurant added successfully', 'succes', {
//   //         duration: 5000,
//   //         panelClass: ['mat-toolbar', 'mat-warn']
//   //       }); 
//   //       this.router.navigateByUrl('/ViewMyRestaurants');
//   //     }
//   //   );
//   // }
//   addRestaurant() {
//     this.ms.addRestaurant(this.userForm.value).subscribe(
//       () => {
//         this.openSnackBar("Restaurant added successfully");
//         this.router.navigateByUrl('/ViewMyRestaurants');
//       },
//       (error) => {
//         if (error && error.error && error.error.error === "Restaurant ID already exists") {
//           this.openSnackBar("A restaurant with the same ID already exists. Please use a different ID.");
//         } else {
//           console.error("Error adding restaurant:", error);
//           this.openSnackBar("Restaurant already exits");
//         }
//       }
//     );
//   }
//   canClose() {
//     if (this.userForm.dirty) {
//       let display = confirm("Changes you have made may not be saved! Please confirm");
//       return display;
//     }
//     else {
//       return true;
//     }

//   }


//   openSnackBar(message: string) {
//     this.snackbar.open(message, 'Close', {
//       duration: 5000 
//     });
//   }

// }
// import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../services/merchant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent {
  userForm!: FormGroup;
  merchantEmail:string | undefined|null;
  constructor(private fb: FormBuilder, private ms:MerchantService,private snackBar: MatSnackBar,public router:Router) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      restId: ['', Validators.required],
      name: ['', Validators.required],
      location: ['', Validators.required],
    });

   
  }
  get restId(){
    return this.userForm.get("restId");
  }
  get name(){
    return this.userForm.get("name");
  }
  get location(){
    return this.userForm.get("location");
  }



   
  // addRestaurant() {
  //   this.ms.addRestaurant(this.userForm.value).subscribe(
  //     () => {
  //       this.openSnackBar("Restaurant added successfully");
  //       this.router.navigateByUrl('/ViewMyRestaurants');
  //     },
  //     (error) => {
  //       console.error("Error adding restaurant:", error);
  //          }
  //   );
  // }


  // addRestaurant() {
  //   this.ms.addRestaurant(this.userForm.value).subscribe(
  //     () => {
  //       this.openSnackBar("Restaurant added successfully");
  //       this.router.navigateByUrl('/ViewMyRestaurants');
  //     },
  //     (error) => {
  //       if (error && error.error && error.error.error === "Restaurant ID already exists") {
  //         this.openSnackBar("A restaurant with the same ID already exists. Please use a different ID.");
  //       } else {
  //         console.error("Error adding restaurant:", error);
  //         this.openSnackBar("A restaurant with the same ID already exists. Please use a different ID.");
  //       }
  //     }
  //   );
  // }
  addRestaurant() {
    this.ms.addRestaurant(this.userForm.value).subscribe(
      () => {
        this.openSnackBar("Restaurant added successfully");
        this.router.navigateByUrl('/ViewMyRestaurants');
      },
      (error) => {
        if (error && error.error && error.error.error === "Restaurant ID already exists") {
          this.openSnackBar("A restaurant with the same ID already exists. Please use a different ID.");
        } else {
          console.error("Error adding restaurant:", error);
          this.openSnackBar("Restaurant already exits");
        }
      }
    );
  } 
  

  canClose() {
    if (this.userForm.dirty && this.userForm.invalid) {
      let display = confirm("Changes you have made may not be saved! Please confirm");
      return display;
    }
    else {
      return true;
    }

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000 
    });
  }

}