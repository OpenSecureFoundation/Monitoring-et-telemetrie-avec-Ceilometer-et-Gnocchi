import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketPagesComponent } from './ticket-pages.component';

describe('TicketPagesComponent', () => {
  let component: TicketPagesComponent;
  let fixture: ComponentFixture<TicketPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
