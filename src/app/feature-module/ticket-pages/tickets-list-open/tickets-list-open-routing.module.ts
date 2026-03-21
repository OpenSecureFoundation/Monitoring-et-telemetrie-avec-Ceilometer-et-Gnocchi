import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsListOpenComponent } from './tickets-list-open.component';

const routes: Routes = [{ path: '', component: TicketsListOpenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsListOpenRoutingModule { }
