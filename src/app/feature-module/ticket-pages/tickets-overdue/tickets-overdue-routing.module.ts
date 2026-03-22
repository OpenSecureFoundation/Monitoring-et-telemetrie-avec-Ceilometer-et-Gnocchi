import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsOverdueComponent } from './tickets-overdue.component';

const routes: Routes = [{ path: '', component: TicketsOverdueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsOverdueRoutingModule { }
