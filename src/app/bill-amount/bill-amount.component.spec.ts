import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillAmountComponent } from './bill-amount.component';

describe('BillAmountComponent', () => {
  let component: BillAmountComponent;
  let fixture: ComponentFixture<BillAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillAmountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BillAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
