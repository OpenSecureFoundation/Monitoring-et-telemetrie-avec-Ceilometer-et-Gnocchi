import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsResolvedRoutingModule } from './tickets-resolved-routing.module';
import { TicketsResolvedComponent } from './tickets-resolved.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TicketsResolvedComponent
  ],
  imports: [
    CommonModule,
    TicketsResolvedRoutingModule,
    SharedModule
  ]
})
export class TicketsResolvedModule { }
