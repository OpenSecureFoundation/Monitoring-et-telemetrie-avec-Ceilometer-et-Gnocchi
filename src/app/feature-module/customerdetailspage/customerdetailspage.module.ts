import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerdetailspageRoutingModule } from './customerdetailspage-routing.module';
import { CustomerdetailspageComponent } from './customerdetailspage.component';


@NgModule({
  declarations: [
    CustomerdetailspageComponent
  ],
  imports: [
    CommonModule,
    CustomerdetailspageRoutingModule
  ]
})
export class CustomerdetailspageModule { }
