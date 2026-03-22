import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SassSettingsComponent } from './sass-settings.component';

describe('SassSettingsComponent', () => {
  let component: SassSettingsComponent;
  let fixture: ComponentFixture<SassSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SassSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SassSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
