import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';
@Component({
    selector: 'app-general-invoice1',
    templateUrl: './general-invoice1.component.html',
    styleUrls: ['./general-invoice1.component.scss'],
    standalone: false
})
export class GeneralInvoice1Component {
  public routes = routes;
   public base = '';
   public page = '';
   public last = '';
   header!: boolean; 
   sidebar!: boolean; 
}
