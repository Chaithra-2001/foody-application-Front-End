import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ViewRestaurantDishesComponent } from './view-restaurant-dishes/view-restaurant-dishes.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';

import { UserRegisterClosingGuard } from './guards/user-register-closing.guard';
import { MerchantComponentGuard } from './guards/merchant.guard';
import { AddDishClosingGuard } from './guards/add-dish-closing.guard';
import { EditDishClosingGuard } from './guards/edit-dish-closing.guard';
import { EditRestaurantClosingGuard } from './guards/edit-restaurant-closing.guard';
import { AddRestaurantClosingGuard } from './guards/add-restaurant-closing.guard';
import { merchantRegisterClosingGuard } from './guards/merchant-register-closing.guard';
import { ViewMyRestaurantsComponent } from './view-my-restaurants/view-my-restaurants.component';
import { AddToFavRestaurantComponent } from './add-to-fav-restaurant/add-to-fav-restaurant.component';
import { AddToFavDishComponent } from './add-to-fav-dish/add-to-fav-dish.component';
import { UserComponentGuard } from './guards/user.guard';
import { BillAmountComponent } from './bill-amount/bill-amount.component';
import { ApplicationAdminComponent } from './application-admin/application-admin.component';
import { AdministratorComponentGuard } from './guards/administarator.guard';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "addRestaurants",
    component: AddRestaurantComponent,
    canActivate: [MerchantComponentGuard],
    canDeactivate: [AddRestaurantClosingGuard]

  },
  {
    path: "EditRestaurants/:id",
    component: EditRestaurantComponent,
    canActivate: [MerchantComponentGuard],
    canDeactivate: [EditRestaurantClosingGuard]
  },
  {
    path: "EditDish/:restId/:dishID",
    component: EditDishComponent,
    canActivate: [MerchantComponentGuard],

    canDeactivate: [EditDishClosingGuard]

  },
  {
    path: "merchantRegister",
    component: MerchantRegisterComponent,
    canDeactivate: [merchantRegisterClosingGuard]
  },
  {
    path: "merchantLogin",
    component: MerchantLoginComponent
  }
  , {
    path: "addDishes",
    component: AddDishComponent,
    canActivate: [MerchantComponentGuard],
    canDeactivate: [AddDishClosingGuard]
  },
  {
    path: "ViewMyRestaurants",
    component: ViewMyRestaurantsComponent,
    canActivate: [MerchantComponentGuard],
  },
  {
    path: "administrator-page",
    component: ApplicationAdminComponent,
    canActivate: [AdministratorComponentGuard]
  },
  {
    path: "Login",
    component: UserLoginComponent,

  },
  {
    path: "UserRegister",
    component: UserRegisterComponent,



  },
  {
    path: 'bill-Amount', component: BillAmountComponent,
    canActivate: [UserComponentGuard]
  },
  {
    path: "ViewRestaurant",
    redirectTo: "",

  },
  {
    path: "ViewOneRestaurant/:restId",
    component: ViewRestaurantDishesComponent
  },


  {
    path: "favoriteRestaurant",
    component: AddToFavRestaurantComponent,
    canActivate: [UserComponentGuard],



  },

  {
    path: "favoriteDish",
    component: AddToFavDishComponent,
    canActivate: [UserComponentGuard],

  },
  {
    path: "order-History",
    component: OrderHistoryComponent,
    canActivate: [UserComponentGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
