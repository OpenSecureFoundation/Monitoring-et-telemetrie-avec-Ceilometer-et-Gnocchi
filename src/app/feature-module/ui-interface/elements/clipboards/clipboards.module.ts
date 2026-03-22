import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardsRoutingModule } from './clipboards-routing.module';
import { ClipboardsComponent } from './clipboards.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ClipboardsComponent],
  imports: [CommonModule, ClipboardsRoutingModule, SharedModule],
})
export class ClipboardsModule {}
