import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeathersRoutingModule } from './feathers-routing.module';
import { FeathersComponent } from './feathers.component';


@NgModule({
  declarations: [
    FeathersComponent
  ],
  imports: [
    CommonModule,
    FeathersRoutingModule
  ]
})
export class FeathersModule { }
