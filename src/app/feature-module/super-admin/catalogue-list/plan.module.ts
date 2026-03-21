import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanRoutingModule } from './plan-routing.module';
import { PlansListComponent } from './plans-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlanCreateModalComponent } from '../plan-create/plan-create-modal.component';

@NgModule({
  declarations: [PlansListComponent],
  imports: [
    CommonModule,
    PlanRoutingModule,
    SharedModule,
    PlanCreateModalComponent,
  ],
})
export class PlanModule {}
