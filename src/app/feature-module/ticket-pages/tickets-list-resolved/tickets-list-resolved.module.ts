import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsListResolvedRoutingModule } from './tickets-list-resolved-routing.module';
import { TicketsListResolvedComponent } from './tickets-list-resolved.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsListResolvedComponent
  ],
  imports: [
    CommonModule,
    TicketsListResolvedRoutingModule,
    SharedModule
  ]
})
export class TicketsListResolvedModule { }
