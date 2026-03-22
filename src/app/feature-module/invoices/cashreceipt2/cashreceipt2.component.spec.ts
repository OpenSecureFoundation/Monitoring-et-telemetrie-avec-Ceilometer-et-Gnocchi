import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cashreceipt2Component } from './cashreceipt2.component';

describe('Cashreceipt2Component', () => {
  let component: Cashreceipt2Component;
  let fixture: ComponentFixture<Cashreceipt2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cashreceipt2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cashreceipt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
