import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListDraftRoutingModule } from './tickets-list-draft-routing.module';
import { TicketsListDraftComponent } from './tickets-list-draft.component';


@NgModule({
  declarations: [
    TicketsListDraftComponent
  ],
  imports: [
    CommonModule,
    TicketsListDraftRoutingModule
  ]
})
export class TicketsListDraftModule { }
