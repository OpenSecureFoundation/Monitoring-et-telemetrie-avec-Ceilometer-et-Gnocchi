import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListRecurringComponent } from './tickets-list-recurring.component';

describe('TicketsListRecurringComponent', () => {
  let component: TicketsListRecurringComponent;
  let fixture: ComponentFixture<TicketsListRecurringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListRecurringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListRecurringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
