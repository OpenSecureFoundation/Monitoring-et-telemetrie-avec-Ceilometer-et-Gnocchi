import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsListRoutingModule } from './payments-list-routing.module';
import { PaymentsListComponent } from './payments-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PaymentsListComponent],
  imports: [CommonModule, PaymentsListRoutingModule, SharedModule],
})
export class PaymentsListModule {}
