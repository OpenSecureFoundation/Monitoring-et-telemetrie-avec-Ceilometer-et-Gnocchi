import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListClosedComponent } from './tickets-list-closed.component';

describe('TicketsListClosedComponent', () => {
  let component: TicketsListClosedComponent;
  let fixture: ComponentFixture<TicketsListClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListClosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
