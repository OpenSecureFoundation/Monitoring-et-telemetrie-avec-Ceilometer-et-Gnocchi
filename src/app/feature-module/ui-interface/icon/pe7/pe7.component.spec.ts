import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pe7Component } from './pe7.component';

describe('Pe7Component', () => {
  let component: Pe7Component;
  let fixture: ComponentFixture<Pe7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pe7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pe7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
