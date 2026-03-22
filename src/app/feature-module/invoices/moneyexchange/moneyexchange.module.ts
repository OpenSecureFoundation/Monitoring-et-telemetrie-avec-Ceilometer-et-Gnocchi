import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoneyexchangeRoutingModule } from './moneyexchange-routing.module';
import { MoneyexchangeComponent } from './moneyexchange.component';


@NgModule({
  declarations: [
    MoneyexchangeComponent
  ],
  imports: [
    CommonModule,
    MoneyexchangeRoutingModule
  ]
})
export class MoneyexchangeModule { }
