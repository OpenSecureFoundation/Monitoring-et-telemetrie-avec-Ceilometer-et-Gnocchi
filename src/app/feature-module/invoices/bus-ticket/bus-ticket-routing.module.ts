import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusTicketComponent } from './bus-ticket.component';

const routes: Routes = [{ path: '', component: BusTicketComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusTicketRoutingModule { }
