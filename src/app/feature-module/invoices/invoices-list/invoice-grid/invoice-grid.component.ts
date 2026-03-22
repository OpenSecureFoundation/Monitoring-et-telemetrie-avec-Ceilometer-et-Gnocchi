import { Component} from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-invoice-grid',
    templateUrl: './invoice-grid.component.html',
    styleUrls: ['./invoice-grid.component.scss'],
    standalone: false
})
export class InvoiceGridComponent{
 
  public routes = routes
 

}
