import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringPagesComponent } from './recurring-pages.component';

const routes: Routes = [
  { path: '', component: RecurringPagesComponent,children :[
    {
      path: 'recurring-invoices',
      loadChildren: () =>
        import('./recurring-invoices/recurring-invoices.module').then(
          (m) => m.RecurringInvoicesModule
        ),
    },
    {
      path: 'recurring-paid',
      loadChildren: () =>
        import('./recurring-paid/recurring-paid.module').then(
          (m) => m.RecurringPaidModule
        ),
    },
    {
      path: 'recurring-pending',
      loadChildren: () =>
        import('./recurring-pending/recurring-pending.module').then(
          (m) => m.RecurringPendingModule
        ),
    },
    {
      path: 'recurring-overdue',
      loadChildren: () =>
        import('./recurring-overdue/recurring-overdue.module').then(
          (m) => m.RecurringOverdueModule
        ),
    },
    {
      path: 'recurring-draft',
      loadChildren: () =>
        import('./recurring-draft/recurring-draft.module').then(
          (m) => m.RecurringDraftModule
        ),
    },
    {
      path: 'recurring',
      loadChildren: () =>
        import('./recurring/recurring.module').then((m) => m.RecurringModule),
    },
    {
      path: 'recurring-cancelled',
      loadChildren: () =>
        import('./recurring-cancelled/recurring-cancelled.module').then(
          (m) => m.RecurringCancelledModule
        ),
    },
  ] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecurringPagesRoutingModule {}
