import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPermissionComponent } from './roles-permission.component';

describe('RolesPermissionComponent', () => {
  let component: RolesPermissionComponent;
  let fixture: ComponentFixture<RolesPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolesPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
