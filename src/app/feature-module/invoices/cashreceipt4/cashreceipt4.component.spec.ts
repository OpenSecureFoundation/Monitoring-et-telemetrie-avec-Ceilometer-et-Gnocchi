import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cashreceipt4Component } from './cashreceipt4.component';

describe('Cashreceipt4Component', () => {
  let component: Cashreceipt4Component;
  let fixture: ComponentFixture<Cashreceipt4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cashreceipt4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cashreceipt4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
