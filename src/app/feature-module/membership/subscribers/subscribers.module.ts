import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscribersRoutingModule } from './subscribers-routing.module';
import { SubscribersComponent } from './subscribers.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    SubscribersComponent
  ],
  imports: [
    CommonModule,
    SubscribersRoutingModule,
    SharedModule
  ]
})
export class SubscribersModule { }
