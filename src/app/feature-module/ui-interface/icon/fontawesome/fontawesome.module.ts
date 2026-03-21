import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontawesomeRoutingModule } from './fontawesome-routing.module';
import { FontawesomeComponent } from './fontawesome.component';


@NgModule({
  declarations: [
    FontawesomeComponent
  ],
  imports: [
    CommonModule,
    FontawesomeRoutingModule
  ]
})
export class FontawesomeModule { }
