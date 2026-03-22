import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsOverdueComponent } from './tickets-overdue.component';

describe('TicketsOverdueComponent', () => {
  let component: TicketsOverdueComponent;
  let fixture: ComponentFixture<TicketsOverdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsOverdueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
