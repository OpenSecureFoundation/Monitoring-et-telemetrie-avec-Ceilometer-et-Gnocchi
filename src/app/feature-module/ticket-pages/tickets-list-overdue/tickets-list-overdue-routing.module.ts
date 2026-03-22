import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListOverdueComponent } from './tickets-list-overdue.component';

const routes: Routes = [{ path: '', component: TicketsListOverdueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsListOverdueRoutingModule { }
