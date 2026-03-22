import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankSettingsRoutingModule } from './bank-settings-routing.module';
import { BankSettingsComponent } from './bank-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [BankSettingsComponent],
  imports: [CommonModule, BankSettingsRoutingModule, SharedModule],
})
export class BankSettingsModule {}
