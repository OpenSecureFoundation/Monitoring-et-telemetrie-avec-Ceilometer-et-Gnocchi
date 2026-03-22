import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListRoutingModule } from './customer-list-routing.module';
import { CustomerListComponent } from './customer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CustomerListComponent],
  imports: [CommonModule, CustomerListRoutingModule, SharedModule],
})
export class CustomerListModule {}
