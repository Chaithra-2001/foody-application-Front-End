
import { Dish } from '../models/dishes';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  dishId?: string;
  restaurantId?: string;
  editDishForm: FormGroup;
  
  constructor(
    private ms: MerchantService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private snackbar:MatSnackBar
  ) {
    this.editDishForm = this.formBuilder.group({
      restId:'',
      dishID: '',
      dishname: '',
      category: '',
      price: '',
      rating: ''
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const restaurantIdParam = params.get('restId');
      const dishIdParam = params.get('dishID');
      
      if (restaurantIdParam && dishIdParam) {
        this.restaurantId = restaurantIdParam;
        this.dishId = dishIdParam;
        
        this.getDishDetails(this.restaurantId, this.dishId);
      } else {
        console.error('Invalid parameters provided.');
      }
    });
  }

  getDishDetails(restaurantId: string, dishId: string): void {
    this.ms.getDishByDishId(restaurantId, dishId).subscribe(data => {
      this.editDishForm.patchValue(data);
    }, error => {
      console.error('Error fetching dish details:', error);
    });
  }

  editDish() {
    if (this.restaurantId && this.dishId) {
      this.ms.updateDish(this.restaurantId, this.dishId, this.editDishForm.value).subscribe(data => {
        console.log('Dish edited successfully:', data);
        this.openSnackBar('Dish edited successfully');
        this.router.navigateByUrl('/ViewMyRestaurants'); 
      }, error => {
        console.error('Error editing dish:', error);
      });
    } else {
      console.error('Restaurant ID or Dish ID is undefined. Cannot edit dish.');
      this.openSnackBar('Failed to edit dish. Please check the console for details.');
    }
  }

  canClose() {
    if (this.editDishForm.dirty && this.editDishForm.invalid) {
      let display = confirm("Changes you have made may not be saved! Please confirm");
      return display;
    }
    else {
      return true;
    }

  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 3000 // Duration for which the snackbar will be displayed (in milliseconds)
    });
  }
}