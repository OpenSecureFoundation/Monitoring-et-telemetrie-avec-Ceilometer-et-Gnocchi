import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePreviewInvoiceComponent } from './signature-preview-invoice.component';

describe('SignaturePreviewInvoiceComponent', () => {
  let component: SignaturePreviewInvoiceComponent;
  let fixture: ComponentFixture<SignaturePreviewInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignaturePreviewInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaturePreviewInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
