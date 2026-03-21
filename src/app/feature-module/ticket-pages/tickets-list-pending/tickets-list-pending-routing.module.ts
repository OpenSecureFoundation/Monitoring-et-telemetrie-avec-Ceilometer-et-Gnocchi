import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListPendingComponent } from './tickets-list-pending.component';

const routes: Routes = [{ path: '', component: TicketsListPendingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsListPendingRoutingModule { }
