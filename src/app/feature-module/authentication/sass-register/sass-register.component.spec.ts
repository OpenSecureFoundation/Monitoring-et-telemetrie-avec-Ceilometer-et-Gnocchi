import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SassRegisterComponent } from './sass-register.component';

describe('SassRegisterComponent', () => {
  let component: SassRegisterComponent;
  let fixture: ComponentFixture<SassRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SassRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SassRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
