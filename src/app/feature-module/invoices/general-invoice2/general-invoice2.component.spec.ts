import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInvoice2Component } from './general-invoice2.component';

describe('GeneralInvoice2Component', () => {
  let component: GeneralInvoice2Component;
  let fixture: ComponentFixture<GeneralInvoice2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInvoice2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInvoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
