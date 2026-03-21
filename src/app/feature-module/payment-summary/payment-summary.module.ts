import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSummaryRoutingModule } from './payment-summary-routing.module';
import { PaymentSummaryComponent } from './payment-summary.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PaymentSummaryComponent
  ],
  imports: [
    CommonModule,
    PaymentSummaryRoutingModule,
    SharedModule
  ]
})
export class PaymentSummaryModule { }
