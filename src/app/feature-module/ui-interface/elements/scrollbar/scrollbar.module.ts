import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollbarRoutingModule } from './scrollbar-routing.module';
import { ScrollbarComponent } from './scrollbar.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ScrollbarComponent],
  imports: [CommonModule, ScrollbarRoutingModule, SharedModule],
})
export class ScrollbarModule {}
