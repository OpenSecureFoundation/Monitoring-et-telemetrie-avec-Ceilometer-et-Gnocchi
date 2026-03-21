import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuFourComponent } from './side-menu-four.component';

describe('SideMenuFourComponent', () => {
  let component: SideMenuFourComponent;
  let fixture: ComponentFixture<SideMenuFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideMenuFourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
