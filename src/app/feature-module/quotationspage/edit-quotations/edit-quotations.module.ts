import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditQuotationsRoutingModule } from './edit-quotations-routing.module';
import { EditQuotationsComponent } from './edit-quotations.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditQuotationsComponent
  ],
  imports: [
    CommonModule,
    EditQuotationsRoutingModule,
    SharedModule
  ]
})
export class EditQuotationsModule { }
