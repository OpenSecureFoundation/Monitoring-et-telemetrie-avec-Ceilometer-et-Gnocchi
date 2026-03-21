import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPurchasesOrderRoutingModule } from './add-purchases-order-routing.module';
import { AddPurchasesOrderComponent } from './add-purchases-order.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPurchasesOrderComponent
  ],
  imports: [
    CommonModule,
    AddPurchasesOrderRoutingModule,
    SharedModule
  ]
})
export class AddPurchasesOrderModule { }
