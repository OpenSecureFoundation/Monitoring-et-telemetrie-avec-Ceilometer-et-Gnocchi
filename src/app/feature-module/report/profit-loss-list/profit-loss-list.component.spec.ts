import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitLossListComponent } from './profit-loss-list.component';

describe('ProfitLossListComponent', () => {
  let component: ProfitLossListComponent;
  let fixture: ComponentFixture<ProfitLossListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfitLossListComponent]
    });
    fixture = TestBed.createComponent(ProfitLossListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
