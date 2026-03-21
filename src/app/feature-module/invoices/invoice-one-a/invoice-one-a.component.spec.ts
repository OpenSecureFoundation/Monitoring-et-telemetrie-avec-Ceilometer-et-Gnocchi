import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceOneAComponent } from './invoice-one-a.component';

describe('InvoiceOneAComponent', () => {
  let component: InvoiceOneAComponent;
  let fixture: ComponentFixture<InvoiceOneAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceOneAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceOneAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
