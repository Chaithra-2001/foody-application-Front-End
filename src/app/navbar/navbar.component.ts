import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { MerchantService } from '../services/merchant.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  user: User = {
    userEmailId: '',
    password: '',
    userName: '',
    role: '',
    location: '',
    phoneNumber: '',
    restaurants: [],
    dishes: []
  };

  constructor(
    public ass: AuthenticationService,
    private ms: MerchantService,
    private router: Router
  ) { }
  ngOnInit() {
    this.ass.user$.subscribe(user => {
      if (user) {
        // Extract the part before '@' and remove numbers
        let usernameWithoutDomain = user.userEmailId.split('@')[0];
        let cleanUsername = usernameWithoutDomain.replace(/\d+/g, ''); // Remove numbers
  
        this.user = { ...user, userName: cleanUsername }; // Update userName with the cleaned username
        console.log('User Data:', this.user); // Debugging line
      }
    });
  }
  
  handleSelection(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'logout') {
      this.logout();
    }
  }
  getdata() {
    this.ms.getUser().subscribe(data => {
      console.log('Merchant Data:', data); // Debugging line
    });
  }

  logout() {
    this.ass.logout();

  }

  //changed fines navbar.ts, auth, user login files
}
