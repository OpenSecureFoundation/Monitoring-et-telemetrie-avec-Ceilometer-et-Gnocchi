import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInventoryComponent } from './all-inventory.component';

describe('AllInventoryComponent', () => {
  let component: AllInventoryComponent;
  let fixture: ComponentFixture<AllInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllInventoryComponent]
    });
    fixture = TestBed.createComponent(AllInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
