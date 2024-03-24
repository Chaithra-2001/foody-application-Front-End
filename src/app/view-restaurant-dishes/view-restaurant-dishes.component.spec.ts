import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantDishesComponent } from './view-restaurant-dishes.component';

describe('ViewRestaurantDishesComponent', () => {
  let component: ViewRestaurantDishesComponent;
  let fixture: ComponentFixture<ViewRestaurantDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRestaurantDishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRestaurantDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
