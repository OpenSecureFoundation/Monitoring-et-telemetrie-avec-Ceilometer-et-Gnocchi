import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInvoice3Component } from './general-invoice3.component';

describe('GeneralInvoice3Component', () => {
  let component: GeneralInvoice3Component;
  let fixture: ComponentFixture<GeneralInvoice3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInvoice3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInvoice3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
