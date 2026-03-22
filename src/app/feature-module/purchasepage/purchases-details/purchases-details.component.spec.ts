import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesDetailsComponent } from './purchases-details.component';

describe('PurchasesDetailsComponent', () => {
  let component: PurchasesDetailsComponent;
  let fixture: ComponentFixture<PurchasesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
