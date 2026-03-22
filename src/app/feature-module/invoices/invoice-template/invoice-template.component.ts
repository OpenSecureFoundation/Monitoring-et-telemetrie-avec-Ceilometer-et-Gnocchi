import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-invoice-template',
    templateUrl: './invoice-template.component.html',
    styleUrls: ['./invoice-template.component.scss'],
    standalone: false
})
export class InvoiceTemplateComponent {
  public routes = routes

}
