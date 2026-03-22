import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDeliveryChallansRoutingModule } from './add-delivery-challans-routing.module';
import { AddDeliveryChallansComponent } from './add-delivery-challans.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AddDeliveryChallansComponent
  ],
  imports: [
    CommonModule,
    AddDeliveryChallansRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
  ]
})
export class AddDeliveryChallansModule { }
