import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
    selector: 'app-invoice-one',
    templateUrl: './invoice-one.component.html',
    styleUrls: ['./invoice-one.component.scss'],
    standalone: false
})
export class InvoiceOneComponent {
  public routes = routes;
}
