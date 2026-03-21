import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListResolvedComponent } from './tickets-list-resolved.component';

describe('TicketsListResolvedComponent', () => {
  let component: TicketsListResolvedComponent;
  let fixture: ComponentFixture<TicketsListResolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListResolvedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
