import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeactiveCustomersRoutingModule } from './deactive-customers-routing.module';
import { DeactiveCustomersComponent } from './deactive-customers.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeactiveCustomersComponent
  ],
  imports: [
    CommonModule,
    DeactiveCustomersRoutingModule,
    SharedModule
  ]
})
export class DeactiveCustomersModule { }
