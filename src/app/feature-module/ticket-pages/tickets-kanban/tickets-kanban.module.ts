import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsKanbanRoutingModule } from './tickets-kanban-routing.module';
import { TicketsKanbanComponent } from './tickets-kanban.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsKanbanComponent
  ],
  imports: [
    CommonModule,
    TicketsKanbanRoutingModule,
    SharedModule
  ]
})
export class TicketsKanbanModule { }
