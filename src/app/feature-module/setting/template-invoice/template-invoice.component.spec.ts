import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateInvoiceComponent } from './template-invoice.component';

describe('TemplateInvoiceComponent', () => {
  let component: TemplateInvoiceComponent;
  let fixture: ComponentFixture<TemplateInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
