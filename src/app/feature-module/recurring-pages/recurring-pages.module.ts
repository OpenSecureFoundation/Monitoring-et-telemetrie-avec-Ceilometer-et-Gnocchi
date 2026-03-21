import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringPagesRoutingModule } from './recurring-pages-routing.module';
import { RecurringPagesComponent } from './recurring-pages.component';


@NgModule({
  declarations: [
    RecurringPagesComponent
  ],
  imports: [
    CommonModule,
    RecurringPagesRoutingModule
  ]
})
export class RecurringPagesModule { }
