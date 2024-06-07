import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginComponent } from '../user-login/user-login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  
   

  userEmail: string | null = '';
    token: string | null = ''; 
  
    constructor(
    
      public ass: AuthenticationService,
      private  userService:UserService
    
     
      
      ) {}
    
    
  
    ngOnInit() {
   this.getUser()
     }
     userData:any;
  getUser(){
    this.userService.getUser().subscribe(data=>{
      this.userData=data;
      console.log("user data "+data);
      
    })
  }
  
  logout(){
    this.ass.logout(); 
  }



  

} 
