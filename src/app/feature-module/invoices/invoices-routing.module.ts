import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoicesComponent } from './invoices.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./invoices-list/invoices-list.module').then(
            (m) => m.InvoicesListModule,
          ),
      },

      {
        path: 'add-invoice',
        loadChildren: () =>
          import('./add-invoice/add-invoice.module').then(
            (m) => m.AddInvoiceModule,
          ),
      },
      {
        path: 'edit-invoice',
        loadChildren: () =>
          import('./edit-invoice/edit-invoice.module').then(
            (m) => m.EditInvoiceModule,
          ),
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'view-invoice',
        loadChildren: () =>
          import('./view-invoice/view-invoice.module').then(
            (m) => m.ViewInvoiceModule,
          ),
      },
      {
        path: 'invoice-template',
        loadChildren: () =>
          import('./invoice-template/invoice-template.module').then(
            (m) => m.InvoiceTemplateModule,
          ),
      },
      {
        path: 'general-invoice1',
        loadChildren: () =>
          import('./general-invoice1/general-invoice1.module').then(
            (m) => m.GeneralInvoice1Module,
          ),
      },
      {
        path: 'general-invoice2',
        loadChildren: () =>
          import('./general-invoice2/general-invoice2.module').then(
            (m) => m.GeneralInvoice2Module,
          ),
      },
      {
        path: 'general-invoice3',
        loadChildren: () =>
          import('./general-invoice3/general-invoice3.module').then(
            (m) => m.GeneralInvoice3Module,
          ),
      },

      {
        path: 'general-invoice4',
        loadChildren: () =>
          import('./general-invoice4/general-invoice4.module').then(
            (m) => m.GeneralInvoice4Module,
          ),
      },
      {
        path: 'general-invoice5',
        loadChildren: () =>
          import('./general-invoice5/general-invoice5.module').then(
            (m) => m.GeneralInvoice5Module,
          ),
      },
      {
        path: 'bus-ticket',
        loadChildren: () =>
          import('./bus-ticket/bus-ticket.module').then(
            (m) => m.BusTicketModule,
          ),
      },
      {
        path: 'car-booking-invoice',
        loadChildren: () =>
          import('./car-booking-invoice/car-booking-invoice.module').then(
            (m) => m.CarBookingInvoiceModule,
          ),
      },
      {
        path: 'coffee-shop',
        loadChildren: () =>
          import('./coffee-shop/coffee-shop.module').then(
            (m) => m.CoffeeShopModule,
          ),
      },
      {
        path: 'domain-hosting',
        loadChildren: () =>
          import('./domain-hosting/domain-hosting.module').then(
            (m) => m.DomainHostingModule,
          ),
      },
      {
        path: 'ecommerce',
        loadChildren: () =>
          import('./ecommerce/ecommerce.module').then((m) => m.EcommerceModule),
      },
      {
        path: 'fitness-center',
        loadChildren: () =>
          import('./fitness-center/fitness-center.module').then(
            (m) => m.FitnessCenterModule,
          ),
      },
      {
        path: 'train-ticket-booking',
        loadChildren: () =>
          import('./train-ticket-booking/train-ticket-booking.module').then(
            (m) => m.TrainTicketBookingModule,
          ),
      },
      {
        path: 'flight-booking-invoice',
        loadChildren: () =>
          import('./flight-booking-invoice/flight-booking-invoice.module').then(
            (m) => m.FlightBookingInvoiceModule,
          ),
      },
      {
        path: 'hotel-booking',
        loadChildren: () =>
          import('./hotel-booking/hotel-booking.module').then(
            (m) => m.HotelBookingModule,
          ),
      },
      {
        path: 'internet-billing',
        loadChildren: () =>
          import('./internet-billing/internet-billing.module').then(
            (m) => m.InternetBillingModule,
          ),
      },
      {
        path: 'medical',
        loadChildren: () =>
          import('./medical/medical.module').then((m) => m.MedicalModule),
      },
      {
        path: 'moneyexchange',
        loadChildren: () =>
          import('./moneyexchange/moneyexchange.module').then(
            (m) => m.MoneyexchangeModule,
          ),
      },
      {
        path: 'movie-ticket-booking',
        loadChildren: () =>
          import('./movie-ticket-booking/movie-ticket-booking.module').then(
            (m) => m.MovieTicketBookingModule,
          ),
      },
      {
        path: 'restuarent-billing',
        loadChildren: () =>
          import('./restuarent-billing/restuarent-billing.module').then(
            (m) => m.RestuarentBillingModule,
          ),
      },
      {
        path: 'student-billing',
        loadChildren: () =>
          import('./student-billing/student-billing.module').then(
            (m) => m.StudentBillingModule,
          ),
      },
      {
        path: 'cashreceipt1',
        loadChildren: () =>
          import('./cashreceipt1/cashreceipt1.module').then(
            (m) => m.Cashreceipt1Module,
          ),
      },
      {
        path: 'cashreceipt2',
        loadChildren: () =>
          import('./cashreceipt2/cashreceipt2.module').then(
            (m) => m.Cashreceipt2Module,
          ),
      },
      {
        path: 'cashreceipt3',
        loadChildren: () =>
          import('./cashreceipt3/cashreceipt3.module').then(
            (m) => m.Cashreceipt3Module,
          ),
      },
      {
        path: 'cashreceipt4',
        loadChildren: () =>
          import('./cashreceipt4/cashreceipt4.module').then(
            (m) => m.Cashreceipt4Module,
          ),
      },
      {
        path: 'invoice-details-admin',
        loadChildren: () =>
          import('./invoice-details-admin/invoice-details-admin.module').then(
            (m) => m.InvoiceDetailsAdminModule,
          ),
      },
      {
        path: 'invoice-details',
        loadChildren: () =>
          import('./invoice-details/invoice-details.module').then(
            (m) => m.InvoiceDetailsModule,
          ),
      },
      {
        path: 'invoice-one',
        loadChildren: () =>
          import('./invoice-one/invoice-one.module').then(
            (m) => m.InvoiceOneModule,
          ),
      },
      {
        path: 'invoice-two',
        loadChildren: () =>
          import('./invoice-two/invoice-two.module').then(
            (m) => m.InvoiceTwoModule,
          ),
      },
      {
        path: 'invoice-three',
        loadChildren: () =>
          import('./invoice-three/invoice-three.module').then(
            (m) => m.InvoiceThreeModule,
          ),
      },
      {
        path: 'invoice-four',
        loadChildren: () =>
          import('./invoice-four/invoice-four.module').then(
            (m) => m.InvoiceFourModule,
          ),
      },
      {
        path: 'invoice-five',
        loadChildren: () =>
          import('./invoice-five/invoice-five.module').then(
            (m) => m.InvoiceFiveModule,
          ),
      },
      {
        path: 'invoice-one-a',
        loadChildren: () =>
          import('./invoice-one-a/invoice-one-a.module').then(
            (m) => m.InvoiceOneAModule,
          ),
      },
      {
        path: 'invoice-four-a',
        loadChildren: () =>
          import('./invoice-four-a/invoice-four-a.module').then(
            (m) => m.InvoiceFourAModule,
          ),
      },
      {
        path: 'signature-preview-invoice',
        loadChildren: () =>
          import(
            './signature-preview-invoice/signature-preview-invoice.module'
          ).then((m) => m.SignaturePreviewInvoiceModule),
      },
      {
        path: 'signature-invoice',
        loadChildren: () =>
          import('./signature-invoice/signature-invoice.module').then(
            (m) => m.SignatureInvoiceModule,
          ),
      },
      {
        path: 'invoice-subscription',
        loadChildren: () =>
          import('./invoice-subscription/invoice-subscription.module').then(
            (m) => m.InvoiceSubscriptionModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
