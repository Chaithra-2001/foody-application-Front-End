// import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MerchantService } from '../services/merchant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
@Component({
  selector: 'app-merchant-register',
  templateUrl: './merchant-register.component.html',
  styleUrls: ['./merchant-register.component.css']
})
export class MerchantRegisterComponent {

togglePasswordVisibility() {
throw new Error('Method not implemented.');
}
userForm!: FormGroup;

hide = true
// passwordPattern: any = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
visible:any ;

  constructor(private fb: FormBuilder,private ms:MerchantService,private route:Router,private snackbar:MatSnackBar) {}
  ngOnInit() {
    this.userForm = this.fb.group({
      merchantName: ['', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z ]*$'), Validators.minLength(5), this.capitalizeFirstLetter]],
      emailId: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@gmail\.com$")]],
      password: ['', [Validators.required,]],
      role: ['Admin'],
       location: ['', Validators.required],
      phoneNumber:  ['', [Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]],
      restaurantList: this.fb.array([])

    });
    
  }

  get merchantName(){
    return this.userForm.get("merchantName");
  }

  get emailId() {
    return this.userForm.get('emailId');
  }

  get password(){
return this.userForm.get('password');
  }

  get location(){
    return this.userForm.get('location');
  }
  get phoneNumber(){
    return this.userForm.get('phoneNumber');
  }



  capitalizeFirstLetter(control: AbstractControl): { [key: string]: boolean } | null {
    const merchantName = control.value as string;
    if (merchantName && merchantName.length > 0) {
      const firstLetter = merchantName.charAt(0).toUpperCase();
      if (merchantName.charAt(0) !== firstLetter) {
        return { firstLetterCapitalized: true };
      }
    }
    return null;
  }

  
  // onSubmit() {
  //   this.ms.register(this.userForm.value).subscribe(
  //     (data) => {
        
  //       this.openSnackBar("Registered successfully");
  //     },
  //     (error) => {
  //       if (error && error.error && error.error.error === "User already exists") {
         
  //         this.openSnackBar("User with the same email ID already exists. Please use a different email ID.");
  //       } else {
  //         console.error("Error:", error);
          
  //         this.openSnackBar("registered succesfully");
  //       }
  //     }
  //   );
  //   this.route.navigateByUrl("merchantLogin")
  // }

  onSubmit() {
    this.ms.register(this.userForm.value).subscribe(
      (data) => {
        this.openSnackBar("Registered successfully");
        this.route.navigateByUrl("/Login");
      },
      (error) => {
        if (error && error.error && error.error.error === "User already exists") {
          this.openSnackBar("User with the same email ID already exists. Please use a different email ID.");
        } else {
          console.error("Error:", error);
          this.openSnackBar("You have already registered please sign in");
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
    this.snackbar.open(message, 'Close', {
      duration: 5000 
    });
  }

}