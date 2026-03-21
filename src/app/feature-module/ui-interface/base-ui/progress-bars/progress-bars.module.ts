import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgressBarsRoutingModule } from './progress-bars-routing.module';
import { ProgressBarsComponent } from './progress-bars.component';


@NgModule({
  declarations: [
    ProgressBarsComponent
  ],
  imports: [
    CommonModule,
    ProgressBarsRoutingModule
  ]
})
export class ProgressBarsModule { }
