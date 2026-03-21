import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPurchaseReturnRoutingModule } from './edit-purchase-return-routing.module';
import { EditPurchaseReturnComponent } from './edit-purchase-return.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditPurchaseReturnComponent
  ],
  imports: [
    CommonModule,
    EditPurchaseReturnRoutingModule,
    SharedModule
  ]
})
export class EditPurchaseReturnModule { }
