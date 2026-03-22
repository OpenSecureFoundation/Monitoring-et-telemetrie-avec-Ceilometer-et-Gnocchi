import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPaymentsComponent } from './add-payments.component';
import { AddPaymentsRoutingModule } from './add-payments-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AddPaymentsComponent],
  imports: [CommonModule, AddPaymentsRoutingModule, SharedModule],
})
export class AddPaymentsModule {}
