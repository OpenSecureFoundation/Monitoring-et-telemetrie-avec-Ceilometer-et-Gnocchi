import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainRequestComponent } from './domain-request.component';

describe('DomainRequestComponent', () => {
  let component: DomainRequestComponent;
  let fixture: ComponentFixture<DomainRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DomainRequestComponent]
    });
    fixture = TestBed.createComponent(DomainRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
