import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseUIComponent } from './base-ui.component';

describe('BaseUIComponent', () => {
  let component: BaseUIComponent;
  let fixture: ComponentFixture<BaseUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
