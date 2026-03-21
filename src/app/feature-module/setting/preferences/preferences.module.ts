import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferencesRoutingModule } from './preferences-routing.module';
import { PreferencesComponent } from './preferences.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PreferencesComponent],
  imports: [CommonModule, PreferencesRoutingModule, SharedModule],
})
export class PreferencesModule {}
