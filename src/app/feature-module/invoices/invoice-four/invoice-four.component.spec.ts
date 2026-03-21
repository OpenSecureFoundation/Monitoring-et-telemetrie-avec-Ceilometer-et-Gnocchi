import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFourComponent } from './invoice-four.component';

describe('InvoiceFourComponent', () => {
  let component: InvoiceFourComponent;
  let fixture: ComponentFixture<InvoiceFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
