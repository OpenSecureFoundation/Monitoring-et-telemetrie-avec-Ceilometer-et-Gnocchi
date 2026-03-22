import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsAdminComponent } from './invoice-details-admin.component';

describe('InvoiceDetailsAdminComponent', () => {
  let component: InvoiceDetailsAdminComponent;
  let fixture: ComponentFixture<InvoiceDetailsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
