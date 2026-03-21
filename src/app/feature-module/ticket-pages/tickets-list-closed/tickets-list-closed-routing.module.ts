import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListClosedComponent } from './tickets-list-closed.component';

const routes: Routes = [{ path: '', component: TicketsListClosedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsListClosedRoutingModule { }
