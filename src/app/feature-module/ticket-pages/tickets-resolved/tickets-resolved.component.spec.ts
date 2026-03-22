import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsResolvedComponent } from './tickets-resolved.component';

describe('TicketsResolvedComponent', () => {
  let component: TicketsResolvedComponent;
  let fixture: ComponentFixture<TicketsResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsResolvedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
