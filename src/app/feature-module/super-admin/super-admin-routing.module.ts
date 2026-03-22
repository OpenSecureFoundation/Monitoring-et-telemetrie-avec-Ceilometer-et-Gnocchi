import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminComponent } from './super-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminComponent,
    children: [
      {
        path: 'companies',
        loadChildren: () =>
          import('./companies/companies.module').then((m) => m.CompaniesModule),
      },
      {
        path: 'subscription',
        loadChildren: () =>
          import('./subscription/subscription.module').then(
            (m) => m.SubscriptionModule,
          ),
      },
      {
        path: 'packages',
        loadChildren: () =>
          import('./packages/packages.module').then((m) => m.PackagesModule),
      },
      {
        path: 'domain-request',
        loadChildren: () =>
          import('./domain-request/domain-request.module').then(
            (m) => m.DomainRequestModule,
          ),
      },
      {
        path: 'domain',
        loadChildren: () =>
          import('./domain/domain.module').then((m) => m.DomainModule),
      },
      {
        path: 'purchase-transaction',
        loadChildren: () =>
          import('./purchase-transaction/purchase-transaction.module').then(
            (m) => m.PurchaseTransactionModule,
          ),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'plans-list',
        loadChildren: () =>
          import('./plans-list/plans-list.module').then(
            (m) => m.PlansListModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminRoutingModule {}
