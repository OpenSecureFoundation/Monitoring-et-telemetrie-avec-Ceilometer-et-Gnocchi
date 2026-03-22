import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesListRoutingModule } from './invoices-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvoicesListComponent } from './invoices-list.component';

@NgModule({
  declarations: [InvoicesListComponent,],
  imports: [CommonModule, InvoicesListRoutingModule, SharedModule],
})
export class InvoicesListModule {}
