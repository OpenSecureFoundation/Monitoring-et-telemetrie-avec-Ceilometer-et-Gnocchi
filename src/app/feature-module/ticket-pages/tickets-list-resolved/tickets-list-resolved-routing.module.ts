import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListResolvedComponent } from './tickets-list-resolved.component';

const routes: Routes = [{ path: '', component: TicketsListResolvedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsListResolvedRoutingModule { }
