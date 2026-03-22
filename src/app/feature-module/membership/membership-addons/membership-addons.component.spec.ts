import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddonsComponent } from './membership-addons.component';

describe('MembershipAddonsComponent', () => {
  let component: MembershipAddonsComponent;
  let fixture: ComponentFixture<MembershipAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipAddonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
