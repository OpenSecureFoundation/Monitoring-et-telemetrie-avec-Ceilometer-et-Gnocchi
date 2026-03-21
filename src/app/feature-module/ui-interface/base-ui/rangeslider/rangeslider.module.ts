import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RangesliderRoutingModule } from './rangeslider-routing.module';
import { RangesliderComponent } from './rangeslider.component';
// import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [
    RangesliderComponent
  ],
  imports: [
    CommonModule,
    RangesliderRoutingModule,
    MatSliderModule
    // NgxSliderModule,
  ]
})
export class RangesliderModule { }
