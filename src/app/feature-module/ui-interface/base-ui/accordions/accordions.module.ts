import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionsRoutingModule } from './accordions-routing.module';
import { AccordionsComponent } from './accordions.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AccordionsComponent],
  imports: [CommonModule, AccordionsRoutingModule, SharedModule],
})
export class AccordionsModule {}
