import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRatsRoutingModule } from './tax-rats-routing.module';
import { TaxRatsComponent } from './tax-rats.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TaxRatsComponent
  ],
  imports: [
    CommonModule,
    TaxRatsRoutingModule,
    SharedModule
  ]
})
export class TaxRatsModule { }
