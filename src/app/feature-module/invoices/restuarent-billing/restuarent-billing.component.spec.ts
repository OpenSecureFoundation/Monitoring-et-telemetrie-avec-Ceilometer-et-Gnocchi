import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestuarentBillingComponent } from './restuarent-billing.component';

describe('RestuarentBillingComponent', () => {
  let component: RestuarentBillingComponent;
  let fixture: ComponentFixture<RestuarentBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestuarentBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestuarentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
