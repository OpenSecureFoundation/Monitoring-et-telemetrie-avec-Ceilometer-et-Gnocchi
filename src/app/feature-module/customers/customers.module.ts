import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from '../ui-interface/tables/data-tables/data-tables.module';
@NgModule({
  declarations: [CustomersComponent],
  imports: [CommonModule, CustomersRoutingModule, SharedModule, DataTablesModule],
})
export class CustomersModule {}
