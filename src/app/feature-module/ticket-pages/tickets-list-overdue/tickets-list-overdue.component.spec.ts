import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListOverdueComponent } from './tickets-list-overdue.component';

describe('TicketsListOverdueComponent', () => {
  let component: TicketsListOverdueComponent;
  let fixture: ComponentFixture<TicketsListOverdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListOverdueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
