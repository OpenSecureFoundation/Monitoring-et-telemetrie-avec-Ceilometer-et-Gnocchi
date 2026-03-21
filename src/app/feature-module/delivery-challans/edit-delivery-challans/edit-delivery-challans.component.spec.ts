import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveryChallansComponent } from './edit-delivery-challans.component';

describe('EditDeliveryChallansComponent', () => {
  let component: EditDeliveryChallansComponent;
  let fixture: ComponentFixture<EditDeliveryChallansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeliveryChallansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDeliveryChallansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
