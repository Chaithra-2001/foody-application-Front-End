
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

  userEmail: any;
  tokenn: any;
  getemailid: any
  hide = true
  private ownerEmail = 'swift@gmail.com';
  private ownerPassword = 'Chai@123';


  constructor(private as: AuthenticationService, private router: Router, private snackbar: MatSnackBar,
  ) { }
  ngOnInit(): void { }



  UserLoginData = {
    emailId: '',
    password: '',

  }

  username: any;
  login() {
    if (this.UserLoginData.emailId === this.ownerEmail && this.UserLoginData.password === this.ownerPassword) {


      const ownerRole = 'owner';


      sessionStorage.setItem('useremailId', this.UserLoginData.emailId);
      sessionStorage.setItem('role', ownerRole);

      this.tokenn = sessionStorage.getItem('token');
      this.getemailid = sessionStorage.getItem('useremailId');
      this.as.isOwner = true;

      console.log(this.tokenn);
      console.log(this.getemailid);

      this.openSnackBar(" Login Successful");
      this.router.navigateByUrl("/administrator-page");

      return;
    }
    this.as.login(this.UserLoginData).subscribe(
      (response) => {
        const token = response.token;
        const role = response.role;

        // alert(role)
        if (role === 'Admin') {
          this.as.isAdmin = true;
        } else if (role === 'User') {
          this.as.isUser = true;
        }
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('useremailId', this.UserLoginData.emailId);
          sessionStorage.setItem('role', role);

          this.tokenn = sessionStorage.getItem('token')
          this.getemailid = sessionStorage.getItem('useremailId')

          console.log(this.tokenn)
          console.log(this.getemailid)
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
        } else {
          this.openSnackBar("Please check emailid or password ");
        }
      }
    );

  }
  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000
    });
  }


}