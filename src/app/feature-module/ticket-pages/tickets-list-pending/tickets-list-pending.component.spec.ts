import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListPendingComponent } from './tickets-list-pending.component';

describe('TicketsListPendingComponent', () => {
  let component: TicketsListPendingComponent;
  let fixture: ComponentFixture<TicketsListPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
