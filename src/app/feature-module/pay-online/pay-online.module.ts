import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayOnlineRoutingModule } from './pay-online-routing.module';
import { PayOnlineComponent } from './pay-online.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PayOnlineComponent
  ],
  imports: [
    CommonModule,
    PayOnlineRoutingModule,
    SharedModule
  ]
})
export class PayOnlineModule { }
