import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
    standalone: false
})
export class ContactDetailsComponent {
  public routes = routes;
  isCollapsed = false;
  users = [
    { name: 'Pricilla Maureen', checked: false },
    { name: 'Randall Hollis', checked: false },
  ];
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
