import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LowStockReportRoutingModule } from './low-stock-report-routing.module';
import { LowStockReportComponent } from './low-stock-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LowStockReportComponent
  ],
  imports: [
    CommonModule,
    LowStockReportRoutingModule,
    SharedModule
  ]
})
export class LowStockReportModule { }
