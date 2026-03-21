import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsServiceComponent } from './products-service.component';

describe('ProductsServiceComponent', () => {
  let component: ProductsServiceComponent;
  let fixture: ComponentFixture<ProductsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
