import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveCustomersRoutingModule } from './active-customers-routing.module';
import { ActiveCustomersComponent } from './active-customers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ActiveCustomersComponent
  ],
  imports: [
    CommonModule,
    ActiveCustomersRoutingModule,
    SharedModule
  ]
})
export class ActiveCustomersModule { }
