import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalRoutingModule } from './horizontal-routing.module';
import { HorizontalComponent } from './horizontal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HorizontalComponent],
  imports: [CommonModule, HorizontalRoutingModule, SharedModule],
})
export class HorizontalModule {}
