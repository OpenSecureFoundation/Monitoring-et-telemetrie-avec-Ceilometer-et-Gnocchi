import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesDetailsRoutingModule } from './purchases-details-routing.module';
import { PurchasesDetailsComponent } from './purchases-details.component';


@NgModule({
  declarations: [
    PurchasesDetailsComponent
  ],
  imports: [
    CommonModule,
    PurchasesDetailsRoutingModule
  ]
})
export class PurchasesDetailsModule { }
