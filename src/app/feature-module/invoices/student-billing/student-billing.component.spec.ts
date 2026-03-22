import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentBillingComponent } from './student-billing.component';

describe('StudentBillingComponent', () => {
  let component: StudentBillingComponent;
  let fixture: ComponentFixture<StudentBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
