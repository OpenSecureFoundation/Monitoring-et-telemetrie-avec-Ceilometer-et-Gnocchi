import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessCenterComponent } from './fitness-center.component';

describe('FitnessCenterComponent', () => {
  let component: FitnessCenterComponent;
  let fixture: ComponentFixture<FitnessCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FitnessCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FitnessCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
