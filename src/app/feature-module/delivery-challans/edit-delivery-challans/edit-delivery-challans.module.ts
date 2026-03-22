import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditDeliveryChallansRoutingModule } from './edit-delivery-challans-routing.module';
import { EditDeliveryChallansComponent } from './edit-delivery-challans.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditDeliveryChallansComponent
  ],
  imports: [
    CommonModule,
    EditDeliveryChallansRoutingModule,
    SharedModule
  ]
})
export class EditDeliveryChallansModule { }
