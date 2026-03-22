import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFiveComponent } from './invoice-five.component';

describe('InvoiceFiveComponent', () => {
  let component: InvoiceFiveComponent;
  let fixture: ComponentFixture<InvoiceFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
