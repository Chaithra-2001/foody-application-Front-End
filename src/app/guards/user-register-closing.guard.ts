import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRegisterComponent } from '../user-register/user-register.component';


@Injectable({
  providedIn: 'root'
})
export class UserRegisterClosingGuard implements CanDeactivate<UserRegisterComponent> {
  canDeactivate(
    component:  UserRegisterComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose ? component.canClose() : true;
  }
}