import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsRecurringComponent } from './tickets-recurring.component';

describe('TicketsRecurringComponent', () => {
  let component: TicketsRecurringComponent;
  let fixture: ComponentFixture<TicketsRecurringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsRecurringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsRecurringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
