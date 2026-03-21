import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipPlansComponent } from './membership-plans.component';

const routes: Routes = [{ path: '', component: MembershipPlansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipPlansRoutingModule { }
