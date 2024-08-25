import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  UserLoginData = {
    emailId: '',
    password: ''
  };

  hide = true;

  // Define the owner's credentials here
  private ownerEmail = 'swift@gmail.com';
  private ownerPassword = 'Chai@123';

  constructor(
    private as: AuthenticationService, 
    private router: Router, 
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  login() {
    // Check if the login data matches the owner's credentials
    if (this.UserLoginData.emailId === this.ownerEmail && this.UserLoginData.password === this.ownerPassword) {
      // If credentials match, create a User object with owner information
      const ownerRole = 'owner';
      const user: User = {
        userEmailId: this.UserLoginData.emailId,
        password: this.UserLoginData.password,
        userName: 'Owner Name', // Example; replace with actual name if available
        role: ownerRole,
        location: '',
        phoneNumber: '',
        restaurants: [],
        dishes: []
      };

      // Store the user details and mark as owner
      this.as.setUser(user);
      this.as.isOwner = true;

      // Show success message and navigate to administrator page
      this.openSnackBar("Login Successful");
      this.router.navigateByUrl("/administrator-page");
    } else {
      // If not owner, try to authenticate using the API
      this.as.login(this.UserLoginData).subscribe(
        (response) => {
          const token = response.token;
          const role = response.role;
          const user: User = {
            userEmailId: this.UserLoginData.emailId,
            password: this.UserLoginData.password,
            userName: response.userName, // Assuming response contains userName
            role: role,
            location: '',
            phoneNumber: '',
            restaurants: [],
            dishes: []
          };

          // Set the role flags based on the response
          if (role === 'Admin') {
            this.as.isAdmin = true;
          } else if (role === 'User') {
            this.as.isUser = true;
          }

          // Store the token and user details in session storage
          if (token) {
            sessionStorage.setItem('token', token);
            this.as.setUser(user);
            this.openSnackBar("Login Successful");
            this.router.navigateByUrl("/");
          } else {
            console.error("Token not found in the response body:", response.body);
          }
        },
        (error) => {
          if (error.error && error.error.error === "merchant already exists") {
            alert("Merchant with the same email ID already exists. Please use a different email ID.");
          } else {
            this.openSnackBar("Please check email ID or password.");
          }
        }
      );
    }
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', { duration: 5000 });
  }
}
