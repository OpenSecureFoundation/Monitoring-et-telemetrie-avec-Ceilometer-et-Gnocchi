import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InternetBillingRoutingModule } from './internet-billing-routing.module';
import { InternetBillingComponent } from './internet-billing.component';


@NgModule({
  declarations: [
    InternetBillingComponent
  ],
  imports: [
    CommonModule,
    InternetBillingRoutingModule
  ]
})
export class InternetBillingModule { }
