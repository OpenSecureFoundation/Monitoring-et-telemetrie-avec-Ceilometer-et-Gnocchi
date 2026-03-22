import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentSettingsRoutingModule } from './payment-settings-routing.module';
import { PaymentSettingsComponent } from './payment-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PaymentSettingsComponent
  ],
  imports: [
    CommonModule,
    PaymentSettingsRoutingModule,
    SharedModule
  ]
})
export class PaymentSettingsModule { }
