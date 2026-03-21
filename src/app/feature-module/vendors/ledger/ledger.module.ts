import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { LedgerComponent } from './ledger.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LedgerComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule,
    SharedModule
  ]
})
export class LedgerModule { }
