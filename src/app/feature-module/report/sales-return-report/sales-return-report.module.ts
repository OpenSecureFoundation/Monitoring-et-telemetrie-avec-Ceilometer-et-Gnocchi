import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReturnReportRoutingModule } from './sales-return-report-routing.module';
import { SalesReturnReportComponent } from './sales-return-report.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SalesReturnReportComponent
  ],
  imports: [
    CommonModule,
    SalesReturnReportRoutingModule,
    SharedModule
  ]
})
export class SalesReturnReportModule { }
