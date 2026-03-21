import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanCreateModalComponent } from './plan-create-modal.component';

const routes: Routes = [
  {
    path: '',
    component: PlanCreateModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePlanRoutingModule {}
