import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryHistoryRoutingModule } from './inventory-history-routing.module';
import { InventoryHistoryComponent } from './inventory-history.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    InventoryHistoryComponent
  ],
  imports: [
    CommonModule,
    InventoryHistoryRoutingModule,
    SharedModule
  ]
})
export class InventoryHistoryModule { }
