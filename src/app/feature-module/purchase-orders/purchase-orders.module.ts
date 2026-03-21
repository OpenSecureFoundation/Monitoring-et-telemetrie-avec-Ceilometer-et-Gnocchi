import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseOrdersRoutingModule } from './purchase-orders-routing.module';
import { PurchaseOrdersComponent } from './purchase-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PurchaseOrdersComponent
  ],
  imports: [
    CommonModule,
    PurchaseOrdersRoutingModule,
    SharedModule
  ]
})
export class PurchaseOrdersModule { }
