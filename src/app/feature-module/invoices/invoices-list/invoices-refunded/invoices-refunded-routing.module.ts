import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesRefundedComponent } from './invoices-refunded.component';

const routes: Routes = [{ path: '', component: InvoicesRefundedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRefundedRoutingModule { }
