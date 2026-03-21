import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipAddonsComponent } from './membership-addons.component';

const routes: Routes = [{ path: '', component: MembershipAddonsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipAddonsRoutingModule { }
