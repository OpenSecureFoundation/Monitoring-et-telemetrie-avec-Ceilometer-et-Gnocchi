import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerdetailspageComponent } from './customerdetailspage.component';

describe('CustomerdetailspageComponent', () => {
  let component: CustomerdetailspageComponent;
  let fixture: ComponentFixture<CustomerdetailspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerdetailspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerdetailspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
