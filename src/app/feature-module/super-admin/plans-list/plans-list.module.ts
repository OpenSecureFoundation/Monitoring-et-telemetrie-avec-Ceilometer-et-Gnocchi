import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansListRoutingModule } from './plans-list-routing.module';
import { PlansListComponent } from './plans-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PlansListComponent
  ],
  imports: [
    CommonModule,
    PlansListRoutingModule,
    SharedModule
  ]
})
export class PlansListModule { }
