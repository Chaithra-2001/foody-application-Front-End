import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddRestaurantComponent } from '../add-restaurant/add-restaurant.component';


@Injectable({
  providedIn: 'root'
})
export class AddRestaurantClosingGuard implements CanDeactivate<AddRestaurantComponent> {
  canDeactivate(
    component:  AddRestaurantComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose ? component.canClose() : true;
  }
}