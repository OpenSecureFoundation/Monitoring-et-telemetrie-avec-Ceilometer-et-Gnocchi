import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPurchaseComponent } from './tax-purchase.component';

describe('TaxPurchaseComponent', () => {
  let component: TaxPurchaseComponent;
  let fixture: ComponentFixture<TaxPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxPurchaseComponent]
    });
    fixture = TestBed.createComponent(TaxPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
