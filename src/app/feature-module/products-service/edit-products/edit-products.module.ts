import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProductsRoutingModule } from './edit-products-routing.module';
import { EditProductsComponent } from './edit-products.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditProductsComponent
  ],
  imports: [
    CommonModule,
    EditProductsRoutingModule,
    SharedModule
  ]
})
export class EditProductsModule { }
