import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllInventoryRoutingModule } from './all-inventory-routing.module';
import { AllInventoryComponent } from './all-inventory.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AllInventoryComponent
  ],
  imports: [
    CommonModule,
    AllInventoryRoutingModule,
    SharedModule
  ]
})
export class AllInventoryModule { }
