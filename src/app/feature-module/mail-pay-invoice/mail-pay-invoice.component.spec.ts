import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailPayInvoiceComponent } from './mail-pay-invoice.component';

describe('MailPayInvoiceComponent', () => {
  let component: MailPayInvoiceComponent;
  let fixture: ComponentFixture<MailPayInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailPayInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailPayInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
