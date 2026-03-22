import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockReportRoutingModule } from './stock-report-routing.module';
import { StockReportComponent } from './stock-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    StockReportComponent
  ],
  imports: [
    CommonModule,
    StockReportRoutingModule,
    SharedModule
  ]
})
export class StockReportModule { }
