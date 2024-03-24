import { CanActivateFn } from '@angular/router';


import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MerchantRegisterComponent } from '../merchant-register/merchant-register.component';



@Injectable({
  providedIn: 'root'
})
export class merchantRegisterClosingGuard implements CanDeactivate<MerchantRegisterComponent> {
  canDeactivate(
    component: MerchantRegisterComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose ? component.canClose() : true;
  }
}