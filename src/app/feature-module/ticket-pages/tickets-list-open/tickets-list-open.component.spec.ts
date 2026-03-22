import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListOpenComponent } from './tickets-list-open.component';

describe('TicketsListOpenComponent', () => {
  let component: TicketsListOpenComponent;
  let fixture: ComponentFixture<TicketsListOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
