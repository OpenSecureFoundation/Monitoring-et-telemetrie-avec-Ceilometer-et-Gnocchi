import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BadgesRoutingModule } from './badges-routing.module';
import { BadgesComponent } from './badges.component';


@NgModule({
  declarations: [
    BadgesComponent
  ],
  imports: [
    CommonModule,
    BadgesRoutingModule
  ]
})
export class BadgesModule { }
