import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuOneComponent } from './side-menu-one.component';

describe('SideMenuOneComponent', () => {
  let component: SideMenuOneComponent;
  let fixture: ComponentFixture<SideMenuOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
