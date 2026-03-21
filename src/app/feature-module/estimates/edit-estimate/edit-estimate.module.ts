import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditEstimateRoutingModule } from './edit-estimate-routing.module';
import { EditEstimateComponent } from './edit-estimate.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditEstimateComponent],
  imports: [CommonModule, EditEstimateRoutingModule, SharedModule],
})
export class EditEstimateModule {}
