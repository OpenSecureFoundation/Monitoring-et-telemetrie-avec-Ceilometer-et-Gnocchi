import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  declarations: [
    AddProductsComponent
  ],
  imports: [
    CommonModule,
    AddProductsRoutingModule,
    SharedModule,
    NgxEditorModule
  ]
})
export class AddProductsModule { }
