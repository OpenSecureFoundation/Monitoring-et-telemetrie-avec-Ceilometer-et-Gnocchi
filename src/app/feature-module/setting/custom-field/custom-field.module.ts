import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomFieldRoutingModule } from './custom-field-routing.module';
import { CustomFieldComponent } from './custom-field.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CustomFieldComponent
  ],
  imports: [
    CommonModule,
    CustomFieldRoutingModule,
    SharedModule
  ]
})
export class CustomFieldModule { }
