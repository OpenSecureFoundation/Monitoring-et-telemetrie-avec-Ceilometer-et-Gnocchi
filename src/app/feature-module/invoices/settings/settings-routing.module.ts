import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      {
        path: 'bank',
        loadChildren: () =>
          import('./bank-settings/bank-settings.module').then(
            (m) => m.BankSettingsModule
          ),
      },
      {
        path: 'tax',
        loadChildren: () =>
          import('./tax-settings/tax-settings.module').then(
            (m) => m.TaxSettingsModule
          ),
      },
      {
        path: 'general',
        loadChildren: () =>
          import('./invoices-settings/invoices-settings.module').then(
            (m) => m.InvoicesSettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
