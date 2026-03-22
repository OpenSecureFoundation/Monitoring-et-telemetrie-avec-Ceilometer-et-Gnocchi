import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormMaskRoutingModule } from './form-mask-routing.module';
import { FormMaskComponent } from './form-mask.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FormMaskComponent],
  imports: [CommonModule, FormMaskRoutingModule, SharedModule],
})
export class FormMaskModule {}
