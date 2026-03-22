import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanBillingComponent } from './plan-billing.component';

const routes: Routes = [{ path: '', component: PlanBillingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanBillingRoutingModule { }
