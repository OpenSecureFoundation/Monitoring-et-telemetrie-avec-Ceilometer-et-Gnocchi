import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoffeeShopRoutingModule } from './coffee-shop-routing.module';
import { CoffeeShopComponent } from './coffee-shop.component';


@NgModule({
  declarations: [
    CoffeeShopComponent
  ],
  imports: [
    CommonModule,
    CoffeeShopRoutingModule
  ]
})
export class CoffeeShopModule { }
