import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFieldComponent } from './custom-field.component';

describe('CustomFieldComponent', () => {
  let component: CustomFieldComponent;
  let fixture: ComponentFixture<CustomFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomFieldComponent]
    });
    fixture = TestBed.createComponent(CustomFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
