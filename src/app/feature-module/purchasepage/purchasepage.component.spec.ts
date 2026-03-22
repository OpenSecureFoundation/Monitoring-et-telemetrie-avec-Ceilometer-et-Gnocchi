import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasepageComponent } from './purchasepage.component';

describe('PurchasepageComponent', () => {
  let component: PurchasepageComponent;
  let fixture: ComponentFixture<PurchasepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
