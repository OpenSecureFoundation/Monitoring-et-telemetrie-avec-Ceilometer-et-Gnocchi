import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
    selector: 'app-tax-rats',
    templateUrl: './tax-rats.component.html',
    styleUrls: ['./tax-rats.component.scss'],
    standalone: false
})
export class TaxRatsComponent {
  public routes = routes 
  type = "selecttype"

}
