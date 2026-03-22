import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringOverdueComponent } from './recurring-overdue.component';

describe('RecurringOverdueComponent', () => {
  let component: RecurringOverdueComponent;
  let fixture: ComponentFixture<RecurringOverdueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringOverdueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
