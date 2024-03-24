// // import { Component } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UserService } from '../services/user.service';
// import { Router } from '@angular/router';
// import { Component } from '@angular/core';
// @Component({
//   selector: 'app-user-register',
//   templateUrl: './user-register.component.html',
//   styleUrl: './user-register.component.css'
// })
// export class UserRegisterComponent {
// emailId: any;
// merchantName: any;
// togglePasswordVisibility() {
// throw new Error('Method not implemented.');
// }
//   userForm!: FormGroup;
// phoneNumber: any;
// location: any;
// password: any;
// visible: any;
//   constructor(private fb: FormBuilder,private us:UserService,private route:Router) {}
//   ngOnInit() {
//     this.userForm = this.fb.group({
//       emailId: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
//       role: ['User'],
//       merchantName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$'), Validators.minLength(5), this.capitalizeFirstLetter]],
//       location: ['', Validators.required],
//       phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       restaurantList: this.fb.array([])
//     });
//   }
//   capitalizeFirstLetter(control: AbstractControl): { [key: string]: boolean } | null {
//     const Name = control.value as string;
//     if (Name && Name.length > 0) {
//       const firstLetter = Name.charAt(0).toUpperCase();
//       if (Name.charAt(0) !== firstLetter) {
//         return { firstLetterCapitalized: true };
//       }
//     }
//     return null;
//   }

  
//   onSubmit() {
//     this.us.register(this.userForm.value).subscribe(
//       (data) => {
//         alert("Registered successfully");
//       },
//       (error) => {
//         if (error && error.error && error.error.error === "User already exists") {
//           alert("User with the same email ID already exists. Please use a different email ID.");
//         } else {
//           console.error("Error:", error);
//           alert("Failed to add customer. Please try again later.");
//         }
//       }
//     );
//     this.route.navigateByUrl("UserLogin")
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
// }
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

togglePasswordVisibility() {
throw new Error('Method not implemented.');
}
  userForm!: FormGroup;


hide=true
  constructor(private fb: FormBuilder,private us:UserService,private route:Router,private snackbar:MatSnackBar) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      role: ['User'],
      userName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$'), Validators.minLength(5), this.capitalizeFirstLetter]],
      location: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      restaurantList: this.fb.array([])
    });
  }
  capitalizeFirstLetter(control: AbstractControl): { [key: string]: boolean } | null {
    const Name = control.value as string;
    if (Name && Name.length > 0) {
      const firstLetter = Name.charAt(0).toUpperCase();
      if (Name.charAt(0) !== firstLetter) {
        return { firstLetterCapitalized: true };
      }
    }
    return null;
  }
  get emailId(){
    return this.userForm.get("emailId");
  }
  get password(){
    return this.userForm.get("password");
  }
  get userName(){
    return this.userForm.get("userName");
  }

  get location(){
    return this.userForm.get("location");
      }

      get phoneNumber(){
        return this.userForm.get("phoneNumber");
      }


  
  onSubmit() {
    this.us.register(this.userForm.value).subscribe(
      (data) => {
          this.openSnackBar("Registered successfully");
      },
      (error) => {
        if (error && error.error && error.error.error === "User already exists") {
         
          this.openSnackBar("User with the same email ID already exists. Please use a different email ID");
          
        } else {
          console.error("Error:", error);
          this.openSnackBar("Failed to add customer. Please try again later.");
        }
      }
    );
    this.route.navigateByUrl("/Login")
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
    this.snackbar.open(message, 'Close', {
      duration: 5000 
    });
  }
}