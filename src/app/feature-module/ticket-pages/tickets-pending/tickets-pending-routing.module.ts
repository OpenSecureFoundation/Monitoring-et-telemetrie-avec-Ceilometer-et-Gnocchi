import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsPendingComponent } from './tickets-pending.component';

const routes: Routes = [{ path: '', component: TicketsPendingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsPendingRoutingModule { }
