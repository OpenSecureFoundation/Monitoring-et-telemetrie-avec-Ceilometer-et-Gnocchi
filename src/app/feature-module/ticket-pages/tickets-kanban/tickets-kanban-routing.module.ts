import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsKanbanComponent } from './tickets-kanban.component';

const routes: Routes = [{ path: '', component: TicketsKanbanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsKanbanRoutingModule { }
