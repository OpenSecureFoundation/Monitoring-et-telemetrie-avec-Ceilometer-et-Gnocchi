import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseReportRoutingModule } from './purchase-report-routing.module';
import { PurchaseReportComponent } from './purchase-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PurchaseReportComponent
  ],
  imports: [
    CommonModule,
    PurchaseReportRoutingModule,
    SharedModule
  ]
})
export class PurchaseReportModule { }
