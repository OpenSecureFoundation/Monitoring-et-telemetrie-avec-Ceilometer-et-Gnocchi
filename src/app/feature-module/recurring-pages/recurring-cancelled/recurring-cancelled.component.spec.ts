import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringCancelledComponent } from './recurring-cancelled.component';

describe('RecurringCancelledComponent', () => {
  let component: RecurringCancelledComponent;
  let fixture: ComponentFixture<RecurringCancelledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringCancelledComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
