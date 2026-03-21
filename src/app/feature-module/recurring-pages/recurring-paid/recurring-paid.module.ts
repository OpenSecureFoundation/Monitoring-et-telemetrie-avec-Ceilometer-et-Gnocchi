import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringPaidRoutingModule } from './recurring-paid-routing.module';
import { RecurringPaidComponent } from './recurring-paid.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecurringPaidComponent
  ],
  imports: [
    CommonModule,
    RecurringPaidRoutingModule,
    SharedModule
  ]
})
export class RecurringPaidModule { }
