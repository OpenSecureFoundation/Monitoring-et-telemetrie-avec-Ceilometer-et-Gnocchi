import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceSettingsRoutingModule } from './invoice-settings-routing.module';
import { InvoiceSettingsComponent } from './invoice-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InvoiceSettingsComponent
  ],
  imports: [
    CommonModule,
    InvoiceSettingsRoutingModule,
    SharedModule
  ]
})
export class InvoiceSettingsModule { }
