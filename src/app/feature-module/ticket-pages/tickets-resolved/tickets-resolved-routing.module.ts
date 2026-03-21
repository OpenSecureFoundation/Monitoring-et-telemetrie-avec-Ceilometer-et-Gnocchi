import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsResolvedComponent } from './tickets-resolved.component';

const routes: Routes = [{ path: '', component: TicketsResolvedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsResolvedRoutingModule { }
