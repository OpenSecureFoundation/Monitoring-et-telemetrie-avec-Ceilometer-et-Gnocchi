import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeoSettingsRoutingModule } from './seo-settings-routing.module';
import { SeoSettingsComponent } from './seo-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SeoSettingsComponent
  ],
  imports: [
    CommonModule,
    SeoSettingsRoutingModule,
    SharedModule
  ]
})
export class SeoSettingsModule { }
