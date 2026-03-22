import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxSettingsRoutingModule } from './tax-settings-routing.module';
import { TaxSettingsComponent } from './tax-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TaxSettingsComponent],
  imports: [CommonModule, TaxSettingsRoutingModule, SharedModule],
})
export class TaxSettingsModule {}
