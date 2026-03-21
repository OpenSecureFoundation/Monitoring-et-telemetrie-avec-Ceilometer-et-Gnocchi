import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesUnpaidComponent } from './invoices-unpaid.component';

describe('InvoicesUnpaidComponent', () => {
  let component: InvoicesUnpaidComponent;
  let fixture: ComponentFixture<InvoicesUnpaidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesUnpaidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesUnpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
