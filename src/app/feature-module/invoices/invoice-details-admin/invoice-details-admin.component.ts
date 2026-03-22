import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
    selector: 'app-invoice-details-admin',
    templateUrl: './invoice-details-admin.component.html',
    styleUrls: ['./invoice-details-admin.component.scss'],
    standalone: false
})
export class InvoiceDetailsAdminComponent {
  public routes = routes
 invoice='details'

}
