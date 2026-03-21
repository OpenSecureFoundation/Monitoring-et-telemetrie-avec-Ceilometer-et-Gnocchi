import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesReportRoutingModule } from './sales-report-routing.module';
import { SalesReportComponent } from './sales-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SalesReportComponent
  ],
  imports: [
    CommonModule,
    SalesReportRoutingModule,
    SharedModule
  ]
})
export class SalesReportModule { }
