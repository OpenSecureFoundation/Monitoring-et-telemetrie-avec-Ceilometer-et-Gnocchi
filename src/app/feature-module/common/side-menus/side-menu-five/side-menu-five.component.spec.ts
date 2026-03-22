import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuFiveComponent } from './side-menu-five.component';

describe('SideMenuFiveComponent', () => {
  let component: SideMenuFiveComponent;
  let fixture: ComponentFixture<SideMenuFiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SideMenuFiveComponent]
    });
    fixture = TestBed.createComponent(SideMenuFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
