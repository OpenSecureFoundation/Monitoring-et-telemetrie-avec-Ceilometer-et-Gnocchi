import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsServiceRoutingModule } from './products-service-routing.module';
import { ProductsServiceComponent } from './products-service.component';


@NgModule({
  declarations: [
    ProductsServiceComponent
  ],
  imports: [
    CommonModule,
    ProductsServiceRoutingModule
  ]
})
export class ProductsServiceModule { }
