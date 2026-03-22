import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringDraftComponent } from './recurring-draft.component';

describe('RecurringDraftComponent', () => {
  let component: RecurringDraftComponent;
  let fixture: ComponentFixture<RecurringDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringDraftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
