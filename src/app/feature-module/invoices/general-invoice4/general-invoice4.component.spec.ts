import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInvoice4Component } from './general-invoice4.component';

describe('GeneralInvoice4Component', () => {
  let component: GeneralInvoice4Component;
  let fixture: ComponentFixture<GeneralInvoice4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInvoice4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInvoice4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
