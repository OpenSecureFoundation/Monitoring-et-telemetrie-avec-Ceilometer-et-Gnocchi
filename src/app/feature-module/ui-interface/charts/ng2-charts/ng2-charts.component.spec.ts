import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2ChartsComponent } from './ng2-charts.component';

describe('Ng2ChartsComponent', () => {
  let component: Ng2ChartsComponent;
  let fixture: ComponentFixture<Ng2ChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ng2ChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ng2ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
