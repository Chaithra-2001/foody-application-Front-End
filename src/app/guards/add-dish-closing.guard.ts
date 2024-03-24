import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AddDishComponent } from '../add-dish/add-dish.component';


@Injectable({
  providedIn: 'root'
})
export class AddDishClosingGuard implements CanDeactivate<AddDishComponent> {
  canDeactivate(
    component: AddDishComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose ? component.canClose() : true;
  }
}