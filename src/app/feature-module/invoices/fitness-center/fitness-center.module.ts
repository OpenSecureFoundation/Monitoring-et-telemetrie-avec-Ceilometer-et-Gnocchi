import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitnessCenterRoutingModule } from './fitness-center-routing.module';
import { FitnessCenterComponent } from './fitness-center.component';


@NgModule({
  declarations: [
    FitnessCenterComponent
  ],
  imports: [
    CommonModule,
    FitnessCenterRoutingModule
  ]
})
export class FitnessCenterModule { }
