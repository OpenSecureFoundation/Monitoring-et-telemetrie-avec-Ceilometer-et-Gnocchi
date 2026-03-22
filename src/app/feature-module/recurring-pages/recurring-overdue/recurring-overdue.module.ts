import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringOverdueRoutingModule } from './recurring-overdue-routing.module';
import { RecurringOverdueComponent } from './recurring-overdue.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecurringOverdueComponent
  ],
  imports: [
    CommonModule,
    RecurringOverdueRoutingModule,
    SharedModule
  ]
})
export class RecurringOverdueModule { }
