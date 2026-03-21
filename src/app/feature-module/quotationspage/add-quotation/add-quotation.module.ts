import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddQuotationRoutingModule } from './add-quotation-routing.module';
import { AddQuotationComponent } from './add-quotation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    AddQuotationComponent
  ],
  imports: [
    CommonModule,
    AddQuotationRoutingModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    
    
  ]
})
export class AddQuotationModule { }
