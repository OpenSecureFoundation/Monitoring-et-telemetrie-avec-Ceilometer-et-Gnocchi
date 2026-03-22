import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasepageRoutingModule } from './purchasepage-routing.module';
import { PurchasepageComponent } from './purchasepage.component';


@NgModule({
  declarations: [
    PurchasepageComponent
  ],
  imports: [
    CommonModule,
    PurchasepageRoutingModule
  ]
})
export class PurchasepageModule { }
