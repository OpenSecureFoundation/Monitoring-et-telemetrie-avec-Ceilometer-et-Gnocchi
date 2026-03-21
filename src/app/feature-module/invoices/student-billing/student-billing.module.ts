import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentBillingRoutingModule } from './student-billing-routing.module';
import { StudentBillingComponent } from './student-billing.component';


@NgModule({
  declarations: [
    StudentBillingComponent
  ],
  imports: [
    CommonModule,
    StudentBillingRoutingModule
  ]
})
export class StudentBillingModule { }
