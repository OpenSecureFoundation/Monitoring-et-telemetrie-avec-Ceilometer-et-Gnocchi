import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChallansComponent } from './delivery-challans.component';

describe('DeliveryChallansComponent', () => {
  let component: DeliveryChallansComponent;
  let fixture: ComponentFixture<DeliveryChallansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryChallansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryChallansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
