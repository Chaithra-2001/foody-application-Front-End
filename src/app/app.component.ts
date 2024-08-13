import { Component, HostListener } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FoodieApplication';
  userEmail: string | null = '';

  constructor(private router: Router) {
    // Get the email ID from session storage during component initialization
    this.userEmail = sessionStorage.getItem('useremailId');
  }


  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event: any): void {
  //   sessionStorage.clear() // Clear session storage on beforeunload event
  //   this.router.navigateByUrl("/")
  // }


}
