import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRatsComponent } from './tax-rats.component';

describe('TaxRatsComponent', () => {
  let component: TaxRatsComponent;
  let fixture: ComponentFixture<TaxRatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxRatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxRatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
