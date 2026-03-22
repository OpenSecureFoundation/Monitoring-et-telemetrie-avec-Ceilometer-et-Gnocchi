import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringPendingRoutingModule } from './recurring-pending-routing.module';
import { RecurringPendingComponent } from './recurring-pending.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecurringPendingComponent
  ],
  imports: [
    CommonModule,
    RecurringPendingRoutingModule,
    SharedModule
  ]
})
export class RecurringPendingModule { }
