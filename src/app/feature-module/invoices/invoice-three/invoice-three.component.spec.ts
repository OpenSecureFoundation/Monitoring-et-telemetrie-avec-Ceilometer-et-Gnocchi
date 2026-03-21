import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceThreeComponent } from './invoice-three.component';

describe('InvoiceThreeComponent', () => {
  let component: InvoiceThreeComponent;
  let fixture: ComponentFixture<InvoiceThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
