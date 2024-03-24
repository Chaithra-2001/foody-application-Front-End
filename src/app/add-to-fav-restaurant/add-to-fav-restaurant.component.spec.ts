import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFavRestaurantComponent } from './add-to-fav-restaurant.component';

describe('AddToFavRestaurantComponent', () => {
  let component: AddToFavRestaurantComponent;
  let fixture: ComponentFixture<AddToFavRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToFavRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddToFavRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
