import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotationsComponent } from './edit-quotations.component';

describe('EditQuotationsComponent', () => {
  let component: EditQuotationsComponent;
  let fixture: ComponentFixture<EditQuotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuotationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
