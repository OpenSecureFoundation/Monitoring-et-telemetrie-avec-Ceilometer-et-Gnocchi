import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPendingComponent } from './recurring-pending.component';

describe('RecurringPendingComponent', () => {
  let component: RecurringPendingComponent;
  let fixture: ComponentFixture<RecurringPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
