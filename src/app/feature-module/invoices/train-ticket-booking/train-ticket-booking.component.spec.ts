import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainTicketBookingComponent } from './train-ticket-booking.component';

describe('TrainTicketBookingComponent', () => {
  let component: TrainTicketBookingComponent;
  let fixture: ComponentFixture<TrainTicketBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainTicketBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainTicketBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
