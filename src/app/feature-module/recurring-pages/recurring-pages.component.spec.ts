import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringPagesComponent } from './recurring-pages.component';

describe('RecurringPagesComponent', () => {
  let component: RecurringPagesComponent;
  let fixture: ComponentFixture<RecurringPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecurringPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
