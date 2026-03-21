import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalFormRoutingModule } from './horizontal-form-routing.module';
import { HorizontalComponent } from '../../elements/horizontal/horizontal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HorizontalComponent],
  imports: [CommonModule, HorizontalFormRoutingModule, SharedModule],
})
export class HorizontalFormModule {}
