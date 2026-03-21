import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNotesDetailsComponent } from './credit-notes-details.component';

describe('CreditNotesDetailsComponent', () => {
  let component: CreditNotesDetailsComponent;
  let fixture: ComponentFixture<CreditNotesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditNotesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditNotesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
