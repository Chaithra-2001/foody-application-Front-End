import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditDishComponent } from '../edit-dish/edit-dish.component';


@Injectable({
  providedIn: 'root'
})
export class EditDishClosingGuard implements CanDeactivate<EditDishComponent> {
  canDeactivate(
    component: EditDishComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canClose ? component.canClose() : true;
  }
}