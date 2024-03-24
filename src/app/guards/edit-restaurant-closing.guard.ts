import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditRestaurantComponent } from '../edit-restaurant/edit-restaurant.component';

@Injectable({
  providedIn: 'root'
})
export class EditRestaurantClosingGuard implements CanDeactivate<EditRestaurantComponent> {
  canDeactivate(
    component: EditRestaurantComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose ? component.canClose() : true;
  }
}
