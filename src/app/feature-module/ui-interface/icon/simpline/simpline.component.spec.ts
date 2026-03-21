import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplineComponent } from './simpline.component';

describe('SimplineComponent', () => {
  let component: SimplineComponent;
  let fixture: ComponentFixture<SimplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimplineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
