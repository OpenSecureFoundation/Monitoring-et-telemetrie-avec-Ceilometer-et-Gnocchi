import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
    selector: 'app-mail-pay-invoice',
    templateUrl: './mail-pay-invoice.component.html',
    styleUrls: ['./mail-pay-invoice.component.scss'],
    standalone: false
})
export class MailPayInvoiceComponent {
  public routes = routes

}
