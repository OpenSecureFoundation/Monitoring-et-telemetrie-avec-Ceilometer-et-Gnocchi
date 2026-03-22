import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceSubscriptionRoutingModule } from './invoice-subscription-routing.module';
import { InvoiceSubscriptionComponent } from './invoice-subscription.component';


@NgModule({
  declarations: [
    InvoiceSubscriptionComponent
  ],
  imports: [
    CommonModule,
    InvoiceSubscriptionRoutingModule
  ]
})
export class InvoiceSubscriptionModule { }
