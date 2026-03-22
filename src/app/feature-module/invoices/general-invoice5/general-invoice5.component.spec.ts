import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInvoice5Component } from './general-invoice5.component';

describe('GeneralInvoice5Component', () => {
  let component: GeneralInvoice5Component;
  let fixture: ComponentFixture<GeneralInvoice5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInvoice5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralInvoice5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
