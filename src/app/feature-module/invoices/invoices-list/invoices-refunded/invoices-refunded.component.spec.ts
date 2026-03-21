import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesRefundedComponent } from './invoices-refunded.component';

describe('InvoicesRefundedComponent', () => {
  let component: InvoicesRefundedComponent;
  let fixture: ComponentFixture<InvoicesRefundedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesRefundedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesRefundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
