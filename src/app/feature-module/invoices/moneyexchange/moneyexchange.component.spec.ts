import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyexchangeComponent } from './moneyexchange.component';

describe('MoneyexchangeComponent', () => {
  let component: MoneyexchangeComponent;
  let fixture: ComponentFixture<MoneyexchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyexchangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoneyexchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
