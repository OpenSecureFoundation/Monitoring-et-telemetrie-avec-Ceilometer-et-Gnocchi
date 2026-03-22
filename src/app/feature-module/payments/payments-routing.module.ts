import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsComponent } from './payments.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentsComponent,
    children: [
      {
        path: 'payments-list',
        loadChildren: () =>
          import('./payments-list/payments-list.module').then((m) => m.PaymentsListModule),
      },
      {
        path: 'add-payment',
        loadChildren: () =>
          import('./add-payments/add-payments.module').then((m) => m.AddPaymentsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsRoutingModule {}
