import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureInvoiceComponent } from './signature-invoice.component';

describe('SignatureInvoiceComponent', () => {
  let component: SignatureInvoiceComponent;
  let fixture: ComponentFixture<SignatureInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignatureInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignatureInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
