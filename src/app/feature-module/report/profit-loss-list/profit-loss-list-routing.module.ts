import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfitLossListComponent } from './profit-loss-list.component';

const routes: Routes = [{ path: '', component: ProfitLossListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfitLossListRoutingModule { }
