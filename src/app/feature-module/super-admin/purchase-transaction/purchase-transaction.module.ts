import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseTransactionRoutingModule } from './purchase-transaction-routing.module';
import { PurchaseTransactionComponent } from './purchase-transaction.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddAlarmModalComponent } from '../alarm/add-alarm-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PurchaseTransactionComponent],
  imports: [
    CommonModule,
    PurchaseTransactionRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    AddAlarmModalComponent,
  ],
})
export class PurchaseTransactionModule {}
