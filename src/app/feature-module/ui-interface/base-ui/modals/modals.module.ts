import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalsRoutingModule } from './modals-routing.module';
import { ModalsComponent } from './modals.component';


@NgModule({
  declarations: [
    ModalsComponent
  ],
  imports: [
    CommonModule,
    ModalsRoutingModule
  ]
})
export class ModalsModule { }
