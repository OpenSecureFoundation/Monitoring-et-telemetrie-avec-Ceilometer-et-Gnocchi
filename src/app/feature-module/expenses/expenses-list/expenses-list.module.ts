import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpensesListRoutingModule } from './expenses-list-routing.module';
import { ExpensesListComponent } from './expenses-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ExpensesListComponent],
  imports: [CommonModule, ExpensesListRoutingModule, SharedModule],
})
export class ExpensesListModule {}
