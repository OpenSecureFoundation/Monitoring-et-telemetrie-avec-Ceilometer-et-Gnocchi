import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlagRoutingModule } from './flag-routing.module';
import { FlagComponent } from './flag.component';


@NgModule({
  declarations: [
    FlagComponent
  ],
  imports: [
    CommonModule,
    FlagRoutingModule
  ]
})
export class FlagModule { }
