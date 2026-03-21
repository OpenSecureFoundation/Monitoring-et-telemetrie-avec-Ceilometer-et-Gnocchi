import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseReturnReportRoutingModule } from './purchase-return-report-routing.module';
import { PurchaseReturnReportComponent } from './purchase-return-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PurchaseReturnReportComponent
  ],
  imports: [
    CommonModule,
    PurchaseReturnReportRoutingModule,
    SharedModule
  ]
})
export class PurchaseReturnReportModule { }
