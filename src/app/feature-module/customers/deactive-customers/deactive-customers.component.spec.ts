import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveCustomersComponent } from './deactive-customers.component';

describe('DeactiveCustomersComponent', () => {
  let component: DeactiveCustomersComponent;
  let fixture: ComponentFixture<DeactiveCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
