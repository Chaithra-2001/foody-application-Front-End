import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './home/home.component';
import { MerchantRegisterComponent } from './merchant-register/merchant-register.component';
import { MerchantLoginComponent } from './merchant-login/merchant-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { EditDishComponent } from './edit-dish/edit-dish.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ViewRestaurantDishesComponent } from './view-restaurant-dishes/view-restaurant-dishes.component';
import { ViewOneDishComponent } from './view-one-dish/view-one-dish.component';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewMyRestaurantsComponent } from './view-my-restaurants/view-my-restaurants.component';
import { AddToFavRestaurantComponent } from './add-to-fav-restaurant/add-to-fav-restaurant.component';
import { AddToFavDishComponent } from './add-to-fav-dish/add-to-fav-dish.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MerchantRegisterComponent,
    MerchantLoginComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AddRestaurantComponent,
    AddDishComponent,
    EditRestaurantComponent,
    EditDishComponent,
    PageNotFoundComponent,
    ViewRestaurantDishesComponent,
    ViewOneDishComponent,
    ViewMyRestaurantsComponent,
    AddToFavRestaurantComponent,
    AddToFavDishComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatSnackBarModule,ReactiveFormsModule,
    MatSelectModule
    
  ],
  providers: [
    provideAnimationsAsync(),{
      provide: HTTP_INTERCEPTORS,
      useClass:  HttpInterceptorService,
      multi: true,
      
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }