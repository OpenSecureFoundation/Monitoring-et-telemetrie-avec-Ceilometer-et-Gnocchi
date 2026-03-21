import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceGridRoutingModule } from './invoice-grid-routing.module';
import { InvoiceGridComponent } from './invoice-grid.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InvoiceGridComponent],
  imports: [CommonModule, InvoiceGridRoutingModule, SharedModule],
})
export class InvoiceGridModule {}
