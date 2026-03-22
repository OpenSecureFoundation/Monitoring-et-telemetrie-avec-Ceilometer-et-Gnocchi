import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypiconRoutingModule } from './typicon-routing.module';
import { TypiconComponent } from './typicon.component';


@NgModule({
  declarations: [
    TypiconComponent
  ],
  imports: [
    CommonModule,
    TypiconRoutingModule
  ]
})
export class TypiconModule { }
