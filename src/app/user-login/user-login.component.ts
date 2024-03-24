
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'] 
})

export class UserLoginComponent implements OnInit {

  userEmail:any;
  alldetails:any;
  tokenget:any
  constructor(private as:AuthenticationService,private router:Router,private snackbar:MatSnackBar,
    ) {}
  ngOnInit(): void {}

   hide=true
  UserLoginData={
    emailId:'',
    password:'',
    
  }

  login() {
  this.as.login(this.UserLoginData).subscribe(
    (response) => {
      const token = response.token;
      const role=response.role;
     
      // alert(role)
      if (role === 'Admin') {
        this.as.isAdmin = true;
      } else if (role === 'User') {
        this.as.isUser = true;
      }
      if (token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('useremailId',this.UserLoginData.emailId);
        sessionStorage.setItem('role', role);
        
      this.alldetails=sessionStorage.getItem('token')
      this.tokenget=sessionStorage.getItem('useremailId')
    console.log(this.alldetails)
    console.log(this.tokenget)
       this.openSnackBar("Login Successful");
        this.router.navigateByUrl("/");
        
      }
  
      else {
        console.error("Token not found in the response body:", response.body);
      }
    },
    (error: { error: { error: string; }; }) => {
      if (error && error.error && error.error.error === "merchant already exists") {
          alert("merchant with the same email ID already exists. Please use a different email ID.")
      }    else {
        this.openSnackBar("Invalid credentials");
      }
    }
   );

}
openSnackBar(message: string) {
  this.snackbar.open(message, 'Close', {
    duration: 5000 // Duration for which the snackbar will be displayed (in milliseconds)
  });
}


}