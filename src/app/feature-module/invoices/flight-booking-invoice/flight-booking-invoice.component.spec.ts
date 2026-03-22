import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingInvoiceComponent } from './flight-booking-invoice.component';

describe('FlightBookingInvoiceComponent', () => {
  let component: FlightBookingInvoiceComponent;
  let fixture: ComponentFixture<FlightBookingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightBookingInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightBookingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
