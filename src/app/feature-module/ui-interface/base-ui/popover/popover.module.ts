import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverRoutingModule } from './popover-routing.module';
import { PopoverComponent } from './popover.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PopoverComponent],
  imports: [CommonModule, PopoverRoutingModule, SharedModule],
})
export class PopoverModules {}
