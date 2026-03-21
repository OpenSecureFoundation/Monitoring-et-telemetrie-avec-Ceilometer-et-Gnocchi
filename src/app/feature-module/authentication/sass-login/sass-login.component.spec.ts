import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SassLoginComponent } from './sass-login.component';

describe('SassLoginComponent', () => {
  let component: SassLoginComponent;
  let fixture: ComponentFixture<SassLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SassLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SassLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
