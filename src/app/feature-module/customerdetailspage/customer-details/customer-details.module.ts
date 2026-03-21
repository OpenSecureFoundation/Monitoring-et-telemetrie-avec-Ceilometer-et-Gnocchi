import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDetailsRoutingModule } from './customer-details-routing.module';
import { CustomerDetailsComponent } from './customer-details.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomerDetailsComponent
  ],
  imports: [
    CommonModule,
    CustomerDetailsRoutingModule,
    SharedModule
  ]
})
export class CustomerDetailsModule { }
