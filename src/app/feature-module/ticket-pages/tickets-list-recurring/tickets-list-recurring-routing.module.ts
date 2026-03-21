import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListRecurringComponent } from './tickets-list-recurring.component';

const routes: Routes = [{ path: '', component: TicketsListRecurringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsListRecurringRoutingModule { }
