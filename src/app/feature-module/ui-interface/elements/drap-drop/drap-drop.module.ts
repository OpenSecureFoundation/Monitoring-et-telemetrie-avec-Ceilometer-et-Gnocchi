import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrapDropRoutingModule } from './drap-drop-routing.module';
import { DrapDropComponent } from './drap-drop.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DrapDropComponent
  ],
  imports: [
    CommonModule,
    DrapDropRoutingModule,SharedModule
  ]
})
export class DrapDropModule { }
