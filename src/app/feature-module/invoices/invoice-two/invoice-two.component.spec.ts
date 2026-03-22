import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTwoComponent } from './invoice-two.component';

describe('InvoiceTwoComponent', () => {
  let component: InvoiceTwoComponent;
  let fixture: ComponentFixture<InvoiceTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
