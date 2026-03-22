import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchasesOrderComponent } from './add-purchases-order.component';

describe('AddPurchasesOrderComponent', () => {
  let component: AddPurchasesOrderComponent;
  let fixture: ComponentFixture<AddPurchasesOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPurchasesOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPurchasesOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
