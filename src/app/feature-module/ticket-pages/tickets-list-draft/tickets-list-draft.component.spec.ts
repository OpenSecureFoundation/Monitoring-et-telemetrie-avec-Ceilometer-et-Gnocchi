import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsListDraftComponent } from './tickets-list-draft.component';

describe('TicketsListDraftComponent', () => {
  let component: TicketsListDraftComponent;
  let fixture: ComponentFixture<TicketsListDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsListDraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsListDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
