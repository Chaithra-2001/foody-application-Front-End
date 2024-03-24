import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

 export class UserComponentGuard implements CanActivate  {

  constructor(private as: AuthenticationService, private router: Router) { }
  canActivate(): boolean {
    if (this.as.isAdmin || this.as.isUser) {
      return true;
    } else {
      this.router.navigateByUrl('/UserLogin');
      return false;
    }
  }


}

