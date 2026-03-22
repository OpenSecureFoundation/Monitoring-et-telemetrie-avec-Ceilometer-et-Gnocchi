import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsComponent } from './units.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    UnitsComponent
  ],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule
  ]
})
export class UnitsModule { }
