import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
    selector: 'app-tickets-list-closed',
    templateUrl: './tickets-list-closed.component.html',
    styleUrls: ['./tickets-list-closed.component.scss'],
    standalone: false
})
export class TicketsListClosedComponent {
  public routes = routes;
  myDateValue!: Date;
  sort = 'sort1';
  isCollapsed = false;
  public Toggledata = false;
  country = 'sort';
  priority = 'priority1';
  status = 'status1';
  Action = 'status';
  public minDate!: Date;
  public maxDate!: Date;

  openContent() {
    this.Toggledata = !this.Toggledata;
  }
  users = [
    { name: 'Pricilla Maureen', checked: false },
    { name: 'Randall Hollis', checked: false },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  user = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false },
  ];
}
