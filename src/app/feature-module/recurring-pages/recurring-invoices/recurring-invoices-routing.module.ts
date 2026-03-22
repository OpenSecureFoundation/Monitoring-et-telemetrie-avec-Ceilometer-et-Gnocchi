import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringInvoicesComponent } from './recurring-invoices.component';

const routes: Routes = [{ path: '', component: RecurringInvoicesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringInvoicesRoutingModule { }
