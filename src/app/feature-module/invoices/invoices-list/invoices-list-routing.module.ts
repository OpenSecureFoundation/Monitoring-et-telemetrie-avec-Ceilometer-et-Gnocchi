import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesListComponent } from './invoices-list.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesListComponent,
    children: [
      {
        path: 'invoices-list',
        loadChildren: () =>
          import('./all-invoice/all-invoice.module').then(
            (m) => m.AllInvoiceModule
          ),
      },
      {
        path: 'invoice-grid',
        loadChildren: () =>
          import('./invoice-grid/invoice-grid.module').then(
            (m) => m.InvoiceGridModule
          ),
      },
      {
        path: 'paid',
        loadChildren: () =>
          import('./invoices-paid/invoices-paid.module').then(
            (m) => m.InvoicesPaidModule
          ),
      },
      {
        path: 'overdue',
        loadChildren: () =>
          import('./invoices-overdue/invoices-overdue.module').then(
            (m) => m.InvoicesOverdueModule
          ),
      },
      {
        path: 'draft',
        loadChildren: () =>
          import('./invoices-draft/invoices-draft.module').then(
            (m) => m.InvoicesDraftModule
          ),
      },
      {
        path: 'recurring',
        loadChildren: () =>
          import('./invoices-recurring/invoices-recurring.module').then(
            (m) => m.InvoicesRecurringModule
          ),
      },
      {
        path: 'cancelled',
        loadChildren: () =>
          import('./invoices-cancelled/invoices-cancelled.module').then(
            (m) => m.InvoicesCancelledModule
          ),
      },
      { path: 'invoices-unpaid', loadChildren: () => import('./invoices-unpaid/invoices-unpaid.module').then(m => m.InvoicesUnpaidModule) },
      { path: 'invoices-refunded', loadChildren: () => import('./invoices-refunded/invoices-refunded.module').then(m => m.InvoicesRefundedModule) },
    ],
  },
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesListRoutingModule {}
