import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryChallansRoutingModule } from './delivery-challans-routing.module';
import { DeliveryChallansComponent } from './delivery-challans.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeliveryChallansComponent
  ],
  imports: [
    CommonModule,
    DeliveryChallansRoutingModule,
    SharedModule
  ]
})
export class DeliveryChallansModule { }
