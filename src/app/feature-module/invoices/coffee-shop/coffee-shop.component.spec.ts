import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeShopComponent } from './coffee-shop.component';

describe('CoffeeShopComponent', () => {
  let component: CoffeeShopComponent;
  let fixture: ComponentFixture<CoffeeShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeeShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
