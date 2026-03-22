import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceOneComponent } from './invoice-one.component';

describe('InvoiceOneComponent', () => {
  let component: InvoiceOneComponent;
  let fixture: ComponentFixture<InvoiceOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
