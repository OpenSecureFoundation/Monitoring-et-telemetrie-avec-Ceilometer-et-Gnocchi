import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuTwoComponent } from './side-menu-two.component';

describe('SideMenuTwoComponent', () => {
  let component: SideMenuTwoComponent;
  let fixture: ComponentFixture<SideMenuTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
