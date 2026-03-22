import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationReportRoutingModule } from './quotation-report-routing.module';
import { QuotationReportComponent } from './quotation-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    QuotationReportComponent
  ],
  imports: [
    CommonModule,
    QuotationReportRoutingModule,
    SharedModule
  ]
})
export class QuotationReportModule { }
