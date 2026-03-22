import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanBillingRoutingModule } from './plan-billing-routing.module';
import { PlanBillingComponent } from './plan-billing.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PlanBillingComponent
  ],
  imports: [
    CommonModule,
    PlanBillingRoutingModule,
    SharedModule
  ]
})
export class PlanBillingModule { }
