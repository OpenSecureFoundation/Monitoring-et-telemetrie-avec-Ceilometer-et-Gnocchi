import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-tickets-list-recurring',
    templateUrl: './tickets-list-recurring.component.html',
    styleUrls: ['./tickets-list-recurring.component.scss'],
    standalone: false
})
export class TicketsListRecurringComponent {
  public routes = routes
  country = 'India';
  isCollapsed = false;
  users = [
    { name: 'Pricilla Maureen', checked: false },
    { name: 'Randall Hollis', checked: false },
  ];
  
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
