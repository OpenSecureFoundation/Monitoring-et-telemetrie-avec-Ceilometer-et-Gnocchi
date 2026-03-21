import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFourAComponent } from './invoice-four-a.component';

describe('InvoiceFourAComponent', () => {
  let component: InvoiceFourAComponent;
  let fixture: ComponentFixture<InvoiceFourAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFourAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceFourAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
