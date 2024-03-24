
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MerchantService } from '../services/merchant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-merchant-login',
  templateUrl: './merchant-login.component.html',
  styleUrl: './merchant-login.component.css'
})
export class MerchantLoginComponent implements OnInit {
  constructor(private fb: FormBuilder,private as:AuthenticationService,private router:Router,private snackbar:MatSnackBar) {}
  ngOnInit(): void {
    
  }
  merchantLoginData={
    emailId:'',
    password:'',
  
  }





login() {
//   this.as.login(this.merchantLoginData).subscribe(
//     (response) => {
//       const token = response.token;
//       const role=response.role      
//       console.log("token is dislayed"+token)
//       if (token) {
//         sessionStorage.setItem('token', token);
//         sessionStorage.setItem('metchantEmail',this.merchantLoginData.emailId);
//         sessionStorage.setItem('role', role);
//  this.openSnackBar("loggedin successfully");
//         this.router.navigateByUrl("/")
//       }
//       else {
//         console.error("Token not found in the response body:", response.body);

//       }
//     },
//     (error: any) => {
//       if (error.error && error.error.error === "merchant already exists") {
        
//         this.openSnackBar("merchant with the same email ID already exists. Please use a different email ID");
//       } else {
        
//         this.openSnackBar("Invalid credentials")
//       }
//     }
//   );
}

openSnackBar(message: string) {
  this.snackbar.open(message, 'Close', {
    duration: 5000 
  });
}


}

