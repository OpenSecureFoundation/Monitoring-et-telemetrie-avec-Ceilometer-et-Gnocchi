import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconRoutingModule } from './icon-routing.module';
import { IconComponent } from './icon.component';


@NgModule({
  declarations: [
    IconComponent
  ],
  imports: [
    CommonModule,
    IconRoutingModule
  ]
})
export class IconModule { }
