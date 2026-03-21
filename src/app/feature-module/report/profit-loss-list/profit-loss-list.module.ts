import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfitLossListRoutingModule } from './profit-loss-list-routing.module';
import { ProfitLossListComponent } from './profit-loss-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProfitLossListComponent
  ],
  imports: [
    CommonModule,
    ProfitLossListRoutingModule,
    SharedModule
  ]
})
export class ProfitLossListModule { }
