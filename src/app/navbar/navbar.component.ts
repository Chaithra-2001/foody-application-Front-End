import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MerchantService } from '../services/merchant.service';

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
  getdaa: any;
  user: any

  constructor(

    public ass: AuthenticationService,
    private userService: UserService,
    private ms: MerchantService
) { }


 
  ngOnInit() {
    this.getdata()
    this.userService.getUser().subscribe(
      data => {
        this.user = data;
      }
    )
  }



  getdata() {
    this.ms.getUser().subscribe(data => {
      this.getdaa = data
      console.log(data);
    })
  }

  logout() {
    this.ass.logout();
  }





} 
