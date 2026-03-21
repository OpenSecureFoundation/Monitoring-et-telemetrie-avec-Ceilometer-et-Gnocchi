import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerticalFormRoutingModule } from './vertical-form-routing.module';
import { VerticalFormComponent } from './vertical-form.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VerticalFormComponent],
  imports: [CommonModule, VerticalFormRoutingModule, SharedModule],
})
export class VerticalFormModule {}
