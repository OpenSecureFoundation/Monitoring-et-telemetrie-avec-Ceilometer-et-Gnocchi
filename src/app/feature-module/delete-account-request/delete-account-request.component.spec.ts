import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccountRequestComponent } from './delete-account-request.component';

describe('DeleteAccountRequestComponent', () => {
  let component: DeleteAccountRequestComponent;
  let fixture: ComponentFixture<DeleteAccountRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccountRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccountRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
