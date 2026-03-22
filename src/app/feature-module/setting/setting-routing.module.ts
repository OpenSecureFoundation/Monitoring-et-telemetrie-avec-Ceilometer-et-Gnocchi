import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: 'tax-types',
        loadChildren: () =>
          import('./tax-types/tax-types.module').then((m) => m.TaxTypesModule),
      },
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule,
          ),
      },
      {
        path: 'expense-category',
        loadChildren: () =>
          import('./expense-category/expese-category.module').then(
            (m) => m.ExpenseCategoryModule,
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsModule,
          ),
      },
      {
        path: 'preferences',
        loadChildren: () =>
          import('./preferences/preferences.module').then(
            (m) => m.PreferencesModule,
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then(
            (m) => m.ChangePasswordModule,
          ),
      },
      {
        path: 'company-settings',
        loadChildren: () =>
          import('./company-settings/company-settings.module').then(
            (m) => m.CompanySettingsModule,
          ),
      },
      {
        path: 'invoice-settings',
        loadChildren: () =>
          import('./invoice-settings/invoice-settings.module').then(
            (m) => m.InvoiceSettingsModule,
          ),
      },
      {
        path: 'payment-settings',
        loadChildren: () =>
          import('./payment-settings/payment-settings.module').then(
            (m) => m.PaymentSettingsModule,
          ),
      },
      {
        path: 'bank-account',
        loadChildren: () =>
          import('./bank-account/bank-account.module').then(
            (m) => m.BankAccountModule,
          ),
      },
      {
        path: 'tax-rats',
        loadChildren: () =>
          import('./tax-rats/tax-rats.module').then((m) => m.TaxRatsModule),
      },
      {
        path: 'email-settings',
        loadChildren: () =>
          import('./email-settings/email-settings.module').then(
            (m) => m.EmailSettingsModule,
          ),
      },
      {
        path: 'template-invoice',
        loadChildren: () =>
          import('./template-invoice/template-invoice.module').then(
            (m) => m.TemplateInvoiceModule,
          ),
      },
      {
        path: 'plan-billing',
        loadChildren: () =>
          import('./plan-billing/plan-billing.module').then(
            (m) => m.PlanBillingModule,
          ),
      },
      {
        path: 'two-factor',
        loadChildren: () =>
          import('./two-factor/two-factor.module').then(
            (m) => m.TwoFactorModule,
          ),
      },
      {
        path: 'custom-field',
        loadChildren: () =>
          import('./custom-field/custom-field.module').then(
            (m) => m.CustomFieldModule,
          ),
      },
      {
        path: 'email-template',
        loadChildren: () =>
          import('./email-template/email-template.module').then(
            (m) => m.EmailTemplateModule,
          ),
      },
      {
        path: 'seo-settings',
        loadChildren: () =>
          import('./seo-settings/seo-settings.module').then(
            (m) => m.SeoSettingsModule,
          ),
      },
      {
        path: 'sass-settings',
        loadChildren: () =>
          import('./sass-settings/sass-settings.module').then(
            (m) => m.SassSettingsModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
