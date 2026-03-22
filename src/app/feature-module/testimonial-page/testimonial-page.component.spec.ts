import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialPageComponent } from './testimonial-page.component';

describe('TestimonialPageComponent', () => {
  let component: TestimonialPageComponent;
  let fixture: ComponentFixture<TestimonialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
