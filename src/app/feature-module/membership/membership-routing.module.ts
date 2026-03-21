import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembershipComponent } from './membership.component';

const routes: Routes = [
  {
    path: '',
    component: MembershipComponent,
    children: [
      {
        path: 'membership-plans',
        loadChildren: () =>
          import('./membership-plans/membership-plans.module').then(
            (m) => m.MembershipPlansModule
          ),
      },
      {
        path: 'membership-addons',
        loadChildren: () =>
          import('./membership-addons/membership-addons.module').then(
            (m) => m.MembershipAddonsModule
          ),
      },
      {
        path: 'subscribers',
        loadChildren: () =>
          import('./subscribers/subscribers.module').then(
            (m) => m.SubscribersModule
          ),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      }
      
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MembershipRoutingModule {}
