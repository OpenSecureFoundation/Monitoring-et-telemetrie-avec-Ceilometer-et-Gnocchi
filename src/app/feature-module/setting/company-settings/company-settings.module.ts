import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanySettingsRoutingModule } from './company-settings-routing.module';
import { CompanySettingsComponent } from './company-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CompanySettingsComponent
  ],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,
    SharedModule
  ]
})
export class CompanySettingsModule { }
