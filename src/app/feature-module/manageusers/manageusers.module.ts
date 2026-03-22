import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageusersRoutingModule } from './manageusers-routing.module';
import { ManageusersComponent } from './manageusers.component';


@NgModule({
  declarations: [
    ManageusersComponent
  ],
  imports: [
    CommonModule,
    ManageusersRoutingModule
  ]
})
export class ManageusersModule { }
