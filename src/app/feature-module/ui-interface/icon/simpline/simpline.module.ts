import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimplineRoutingModule } from './simpline-routing.module';
import { SimplineComponent } from './simpline.component';


@NgModule({
  declarations: [
    SimplineComponent
  ],
  imports: [
    CommonModule,
    SimplineRoutingModule
  ]
})
export class SimplineModule { }
