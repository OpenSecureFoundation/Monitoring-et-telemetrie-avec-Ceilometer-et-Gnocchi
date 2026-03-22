import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPaidComponent } from './recurring-paid.component';

describe('RecurringPaidComponent', () => {
  let component: RecurringPaidComponent;
  let fixture: ComponentFixture<RecurringPaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringPaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
