import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { PurchasesComponent } from './purchases.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PurchasesComponent
  ],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    SharedModule
  ]
})
export class PurchasesModule { }
