import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditNotePagesComponent } from './credit-note-pages.component';

describe('CreditNotePagesComponent', () => {
  let component: CreditNotePagesComponent;
  let fixture: ComponentFixture<CreditNotePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditNotePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditNotePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
