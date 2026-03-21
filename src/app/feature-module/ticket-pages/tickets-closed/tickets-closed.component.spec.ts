import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsClosedComponent } from './tickets-closed.component';

describe('TicketsClosedComponent', () => {
  let component: TicketsClosedComponent;
  let fixture: ComponentFixture<TicketsClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsClosedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
