import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxPurchaseRoutingModule } from './tax-purchase-routing.module';
import { TaxPurchaseComponent } from './tax-purchase.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TaxPurchaseComponent
  ],
  imports: [
    CommonModule,
    TaxPurchaseRoutingModule,
    SharedModule
  ]
})
export class TaxPurchaseModule { }
