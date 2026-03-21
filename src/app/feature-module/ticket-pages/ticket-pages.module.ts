import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketPagesRoutingModule } from './ticket-pages-routing.module';
import { TicketPagesComponent } from './ticket-pages.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TicketPagesComponent
  ],
  imports: [
    CommonModule,
    TicketPagesRoutingModule,
    MatIconModule
  ]
})
export class TicketPagesModule { }
