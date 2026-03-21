import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanBillingComponent } from './plan-billing.component';

describe('PlanBillingComponent', () => {
  let component: PlanBillingComponent;
  let fixture: ComponentFixture<PlanBillingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanBillingComponent]
    });
    fixture = TestBed.createComponent(PlanBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
