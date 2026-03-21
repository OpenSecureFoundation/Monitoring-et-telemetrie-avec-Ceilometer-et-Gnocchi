import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestuarentBillingRoutingModule } from './restuarent-billing-routing.module';
import { RestuarentBillingComponent } from './restuarent-billing.component';


@NgModule({
  declarations: [
    RestuarentBillingComponent
  ],
  imports: [
    CommonModule,
    RestuarentBillingRoutingModule
  ]
})
export class RestuarentBillingModule { }
