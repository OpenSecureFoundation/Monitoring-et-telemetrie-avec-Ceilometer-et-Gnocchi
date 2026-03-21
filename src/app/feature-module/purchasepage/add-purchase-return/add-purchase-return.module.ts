import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPurchaseReturnRoutingModule } from './add-purchase-return-routing.module';
import { AddPurchaseReturnComponent } from './add-purchase-return.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddPurchaseReturnComponent
  ],
  imports: [
    CommonModule,
    AddPurchaseReturnRoutingModule,
    SharedModule
  ]
})
export class AddPurchaseReturnModule { }
