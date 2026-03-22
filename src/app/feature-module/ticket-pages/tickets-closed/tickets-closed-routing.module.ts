import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsClosedComponent } from './tickets-closed.component';

const routes: Routes = [{ path: '', component: TicketsClosedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsClosedRoutingModule { }
