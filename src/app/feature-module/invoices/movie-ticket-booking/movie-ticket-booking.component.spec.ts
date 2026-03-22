import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTicketBookingComponent } from './movie-ticket-booking.component';

describe('MovieTicketBookingComponent', () => {
  let component: MovieTicketBookingComponent;
  let fixture: ComponentFixture<MovieTicketBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieTicketBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieTicketBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
