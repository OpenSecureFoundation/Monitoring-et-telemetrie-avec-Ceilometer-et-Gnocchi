import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipRoutingModule } from './tooltip-routing.module';
import { TooltipComponent } from './tooltip.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TooltipComponent],
  imports: [CommonModule, TooltipRoutingModule, SharedModule],
})
export class TooltipModule {}
