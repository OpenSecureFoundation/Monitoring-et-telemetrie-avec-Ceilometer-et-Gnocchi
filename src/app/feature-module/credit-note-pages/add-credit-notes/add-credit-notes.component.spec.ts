import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditNotesComponent } from './add-credit-notes.component';

describe('AddCreditNotesComponent', () => {
  let component: AddCreditNotesComponent;
  let fixture: ComponentFixture<AddCreditNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreditNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
