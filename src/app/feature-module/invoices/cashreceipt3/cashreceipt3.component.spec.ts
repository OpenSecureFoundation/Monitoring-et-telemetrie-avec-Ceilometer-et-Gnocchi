import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cashreceipt3Component } from './cashreceipt3.component';

describe('Cashreceipt3Component', () => {
  let component: Cashreceipt3Component;
  let fixture: ComponentFixture<Cashreceipt3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cashreceipt3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cashreceipt3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
