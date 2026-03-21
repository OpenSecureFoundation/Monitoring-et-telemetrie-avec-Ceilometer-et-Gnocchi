import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanDetailComponent } from './plan-detail.component';

const routes: Routes = [{ path: ':id', component: PlanDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanDetailRoutingModule {}
