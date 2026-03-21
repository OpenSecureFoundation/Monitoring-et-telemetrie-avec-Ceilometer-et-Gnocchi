import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuThreeComponent } from './side-menu-three.component';

describe('SideMenuThreeComponent', () => {
  let component: SideMenuThreeComponent;
  let fixture: ComponentFixture<SideMenuThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
