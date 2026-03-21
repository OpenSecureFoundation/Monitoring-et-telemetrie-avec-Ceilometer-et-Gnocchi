import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchasesComponent } from './edit-purchases.component';

describe('EditPurchasesComponent', () => {
  let component: EditPurchasesComponent;
  let fixture: ComponentFixture<EditPurchasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPurchasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
