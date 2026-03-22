import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cashreceipt1Component } from './cashreceipt1.component';

describe('Cashreceipt1Component', () => {
  let component: Cashreceipt1Component;
  let fixture: ComponentFixture<Cashreceipt1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cashreceipt1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cashreceipt1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
