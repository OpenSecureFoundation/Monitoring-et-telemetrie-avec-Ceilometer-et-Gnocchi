import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationspageComponent } from './quotationspage.component';

describe('QuotationspageComponent', () => {
  let component: QuotationspageComponent;
  let fixture: ComponentFixture<QuotationspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationspageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotationspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
