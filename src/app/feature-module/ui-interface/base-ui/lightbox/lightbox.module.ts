import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightboxRoutingModule } from './lightbox-routing.module';
import { LightboxComponent } from './lightbox.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LightboxComponent],
  imports: [CommonModule, LightboxRoutingModule, SharedModule],
})
export class LightboxModule {}
