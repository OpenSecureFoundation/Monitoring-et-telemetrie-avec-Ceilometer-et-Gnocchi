import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternetBillingComponent } from './internet-billing.component';

describe('InternetBillingComponent', () => {
  let component: InternetBillingComponent;
  let fixture: ComponentFixture<InternetBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternetBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternetBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
