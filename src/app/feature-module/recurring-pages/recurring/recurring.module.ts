import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringRoutingModule } from './recurring-routing.module';
import { RecurringComponent } from './recurring.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecurringComponent
  ],
  imports: [
    CommonModule,
    RecurringRoutingModule,
    SharedModule

  ]
})
export class RecurringModule { }
