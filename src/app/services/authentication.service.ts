// import { HttpClient, HttpResponse } from '@angular/common/http';
// // import { Injectable, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';


// import { Injectable } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {
//   private tokenKey = 'token';
//   private token: string | null = null;
//     isAdmin: boolean = false;
//   isUser: boolean = false;

//   constructor(private  httpClient: HttpClient,private router:Router,private snackBar:MatSnackBar) {
//     this.loadToken();
//   }

//   private loadToken(): void {
//     this.token = sessionStorage.getItem(this.tokenKey);
//     if (!this.token) {
//       this.removeToken();
//     }
//   }

//   getToken(): string | null {
//     return this.token;
//   }

//   private removeToken(): void {
//     sessionStorage.removeItem(this.tokenKey);
//   }
//   login(credentials:any): Observable<any>{
//         return this.httpClient.post<any>("http://localhost:8088/api/v1/login", credentials)
//     }


//   clear(): void {
//     sessionStorage.clear();
//   }

//   setToken(token: string): void {
//     this.token = token;
//     sessionStorage.setItem('token', token);
//   }

  
//   logout(): void {
//     // this.removeToken(); // Remove token from session storage
//     this.isAdmin=false;
//     this.isUser=false;
//     sessionStorage.clear()
//     this.router.navigateByUrl('/'); // Navigate to login page after logout
//     this.snackBar.open('You have been logged out.', 'Success', {
//       duration: 3000, // Duration in milliseconds
//     });
//   }

 

  
// }
import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';


import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'token';
  private emailKey="useremailId"
  private token: string | null = null;
    isAdmin: boolean = false;
  isUser: boolean = false;
  useremailid:any

  constructor(private  httpClient: HttpClient,private router:Router,private snackBar:MatSnackBar) {
    this.loadToken();
  }

   loadToken(): void {
    this.token = sessionStorage.getItem(this.tokenKey);
    

  }

  getToken(): string | null {
    return this.token;
  }


  login(credentials:any): Observable<any>{
    
        return this.httpClient.post<any>("http://localhost:8088/api/v1/login", credentials)
        
    }
    getUserEmail(): string | null {
      return sessionStorage.getItem(this.emailKey);
    }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);

  }

  usernamed:any;
  logout(): void {
    // this.removeToken(); // Remove token from session storage
    this.isAdmin=false;
    this.isUser=false;
  
    sessionStorage.clear()
    this.router.navigateByUrl('/'); // Navigate to login page after logout
    this.snackBar.open('You have been logged out.', 'Success', {
      duration: 3000, // Duration in milliseconds
    });
  }

 

  
}