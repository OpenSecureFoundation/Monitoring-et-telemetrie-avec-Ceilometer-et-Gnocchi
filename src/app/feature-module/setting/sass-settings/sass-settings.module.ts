import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SassSettingsRoutingModule } from './sass-settings-routing.module';
import { SassSettingsComponent } from './sass-settings.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SassSettingsComponent
  ],
  imports: [
    CommonModule,
    SassSettingsRoutingModule,
    SharedModule
  ]
})
export class SassSettingsModule { }
