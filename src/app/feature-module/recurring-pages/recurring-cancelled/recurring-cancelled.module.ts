import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringCancelledRoutingModule } from './recurring-cancelled-routing.module';
import { RecurringCancelledComponent } from './recurring-cancelled.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecurringCancelledComponent
  ],
  imports: [
    CommonModule,
    RecurringCancelledRoutingModule,
    SharedModule
  ]
})
export class RecurringCancelledModule { }
