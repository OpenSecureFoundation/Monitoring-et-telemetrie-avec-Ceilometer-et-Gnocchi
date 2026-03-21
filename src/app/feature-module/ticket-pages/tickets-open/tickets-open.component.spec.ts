import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsOpenComponent } from './tickets-open.component';

describe('TicketsOpenComponent', () => {
  let component: TicketsOpenComponent;
  let fixture: ComponentFixture<TicketsOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
