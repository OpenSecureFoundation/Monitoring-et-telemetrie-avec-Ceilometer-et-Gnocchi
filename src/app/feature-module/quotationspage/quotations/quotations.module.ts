import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationsRoutingModule } from './quotations-routing.module';
import { QuotationsComponent } from './quotations.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    QuotationsComponent
  ],
  imports: [
    CommonModule,
    QuotationsRoutingModule,
    SharedModule
  ]
})
export class QuotationsModule { }
