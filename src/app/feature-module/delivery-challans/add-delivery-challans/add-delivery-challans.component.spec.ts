import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeliveryChallansComponent } from './add-delivery-challans.component';

describe('AddDeliveryChallansComponent', () => {
  let component: AddDeliveryChallansComponent;
  let fixture: ComponentFixture<AddDeliveryChallansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeliveryChallansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeliveryChallansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
