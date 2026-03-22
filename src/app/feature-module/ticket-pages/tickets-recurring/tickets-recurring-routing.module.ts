import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsRecurringComponent } from './tickets-recurring.component';

const routes: Routes = [{ path: '', component: TicketsRecurringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRecurringRoutingModule { }
