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
  
  
   
    
    // constructor(

    //   private router: Router,
    //   public ass: AuthenticationService,
    //   private snackBar: MatSnackBar,
      
  
    // ) {}


  
    // ngOnInit(): void {
   
    //   // Initialize other properties or perform other tasks if needed
    // }
  
    // isAdmin: boolean = false;
    // isUser: boolean = false;
    // userEmail: string | null = '';
    // constructor(public userService:UserService ,private router:Router,public ass:AuthenticationService,private snackBar:MatSnackBar){}
  
    // ngOnInit(): void {
    //   // const role = sessionStorage.getItem('role'); // Retrieve role from session storage
    //   // // this.userEmail = sessionStorage.getItem('metchantEmail'); 
    //   // const userEmailFull = sessionStorage.getItem('metchantEmail'); // Retrieve the full email ID
    //   // if (userEmailFull) {
    //   //   // Trim the email ID to get only the name before the '@' symbol
    //   //   this.userEmail = userEmailFull.split('@')[0];
    //   // }
      
    //   // if (role === 'Admin') {
    //   //   this.isAdmin = true;
    //   // } else if (role === 'User') {
    //   //   this.isUser = true;
    //   // }
    // }
   
    userEmail:any;
    token: string | null = ''; // Define a variable to store the token
  
    constructor(
    
      public ass: AuthenticationService,
      private snackBar: MatSnackBar,
      private us:UserService,
      ) {}
    
    
  
    ngOnInit() { }
   
  logout(){
    this.ass.logout(); // Call the logout method from AuthenticationService
  }



  

} 
