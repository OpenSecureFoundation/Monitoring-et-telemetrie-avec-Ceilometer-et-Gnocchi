import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReturnReportComponent } from './sales-return-report.component';

describe('SalesReturnReportComponent', () => {
  let component: SalesReturnReportComponent;
  let fixture: ComponentFixture<SalesReturnReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesReturnReportComponent]
    });
    fixture = TestBed.createComponent(SalesReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
