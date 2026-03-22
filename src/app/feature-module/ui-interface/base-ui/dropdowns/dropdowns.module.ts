import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownsRoutingModule } from './dropdowns-routing.module';
import { DropdownsComponent } from './dropdowns.component';


@NgModule({
  declarations: [
    DropdownsComponent
  ],
  imports: [
    CommonModule,
    DropdownsRoutingModule
  ]
})
export class DropdownsModule { }
