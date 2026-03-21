import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSubscriptionComponent } from './invoice-subscription.component';

describe('InvoiceSubscriptionComponent', () => {
  let component: InvoiceSubscriptionComponent;
  let fixture: ComponentFixture<InvoiceSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceSubscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoiceSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
