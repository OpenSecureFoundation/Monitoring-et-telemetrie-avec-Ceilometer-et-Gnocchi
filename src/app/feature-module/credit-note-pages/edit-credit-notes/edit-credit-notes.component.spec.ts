import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreditNotesComponent } from './edit-credit-notes.component';

describe('EditCreditNotesComponent', () => {
  let component: EditCreditNotesComponent;
  let fixture: ComponentFixture<EditCreditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCreditNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCreditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
