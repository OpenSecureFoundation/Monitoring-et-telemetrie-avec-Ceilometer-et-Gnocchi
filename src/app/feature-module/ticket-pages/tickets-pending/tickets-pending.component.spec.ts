import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPendingComponent } from './tickets-pending.component';

describe('TicketsPendingComponent', () => {
  let component: TicketsPendingComponent;
  let fixture: ComponentFixture<TicketsPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
