import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveBlogComponent } from './inactive-blog.component';

describe('InactiveBlogComponent', () => {
  let component: InactiveBlogComponent;
  let fixture: ComponentFixture<InactiveBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InactiveBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InactiveBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
