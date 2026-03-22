import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInvoice1Component } from './general-invoice1.component';

describe('GeneralInvoice1Component', () => {
  let component: GeneralInvoice1Component;
  let fixture: ComponentFixture<GeneralInvoice1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInvoice1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInvoice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
