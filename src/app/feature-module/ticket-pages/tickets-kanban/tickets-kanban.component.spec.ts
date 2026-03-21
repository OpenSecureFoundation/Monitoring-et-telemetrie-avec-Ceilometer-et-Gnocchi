import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsKanbanComponent } from './tickets-kanban.component';

describe('TicketsKanbanComponent', () => {
  let component: TicketsKanbanComponent;
  let fixture: ComponentFixture<TicketsKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketsKanbanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketsKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
