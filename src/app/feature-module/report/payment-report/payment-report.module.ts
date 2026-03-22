import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentReportRoutingModule } from './payment-report-routing.module';
import { PaymentReportComponent } from './payment-report.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PaymentReportComponent
  ],
  imports: [
    CommonModule,
    PaymentReportRoutingModule,
    SharedModule
  ]
})
export class PaymentReportModule { }
