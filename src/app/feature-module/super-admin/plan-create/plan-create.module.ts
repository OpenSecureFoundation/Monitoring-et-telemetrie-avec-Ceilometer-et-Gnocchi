import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePlanRoutingModule } from './plan-create-routing.module';
import { PlanCreateModalComponent } from './plan-create-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CreatePlanRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    PlanCreateModalComponent,
  ],
  exports: [
    PlanCreateModalComponent, // ← indispensable
  ],
})
export class PlancreateModule {}
