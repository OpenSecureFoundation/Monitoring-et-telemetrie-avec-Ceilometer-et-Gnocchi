import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsOpenComponent } from './tickets-open.component';

const routes: Routes = [{ path: '', component: TicketsOpenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsOpenRoutingModule { }
