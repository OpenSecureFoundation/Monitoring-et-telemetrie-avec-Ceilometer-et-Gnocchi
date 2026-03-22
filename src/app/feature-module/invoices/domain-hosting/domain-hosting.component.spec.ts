import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainHostingComponent } from './domain-hosting.component';

describe('DomainHostingComponent', () => {
  let component: DomainHostingComponent;
  let fixture: ComponentFixture<DomainHostingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomainHostingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomainHostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
