import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RibbonRoutingModule } from './ribbon-routing.module';
import { RibbonComponent } from './ribbon.component';


@NgModule({
  declarations: [
    RibbonComponent
  ],
  imports: [
    CommonModule,
    RibbonRoutingModule
  ]
})
export class RibbonModule { }
