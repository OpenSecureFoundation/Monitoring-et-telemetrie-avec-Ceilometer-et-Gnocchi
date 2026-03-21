import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanDetailRoutingModule } from './plan-detail-routing.module';
import { PlanDetailComponent } from './plan-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  // declarations: [PlanDetailComponent],
  imports: [
    CommonModule,
    PlanDetailRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PlanDetailComponent,
  ],
})
export class PlanDetailModule {}
