import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarBookingInvoiceComponent } from './car-booking-invoice.component';

describe('CarBookingInvoiceComponent', () => {
  let component: CarBookingInvoiceComponent;
  let fixture: ComponentFixture<CarBookingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarBookingInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarBookingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
