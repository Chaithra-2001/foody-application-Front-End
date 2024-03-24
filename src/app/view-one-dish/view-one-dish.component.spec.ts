import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneDishComponent } from './view-one-dish.component';

describe('ViewOneDishComponent', () => {
  let component: ViewOneDishComponent;
  let fixture: ComponentFixture<ViewOneDishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOneDishComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOneDishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
