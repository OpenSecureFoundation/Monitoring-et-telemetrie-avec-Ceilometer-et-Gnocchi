import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-tickets-list-pending',
    templateUrl: './tickets-list-pending.component.html',
    styleUrls: ['./tickets-list-pending.component.scss'],
    standalone: false
})
export class TicketsListPendingComponent {
  public routes = routes
  myDateValue!: Date;
  sort = "sort1"
  isCollapsed = false;
  public Toggledata  = false;
  country = 'sort';
  priority = 'priority1';
  status = 'status1'
  Action ='status'
  public minDate!: Date;
  public maxDate!: Date;

  isCollapsed1 = false;
  isCollapsed2 = false;

  users = [
    { name: 'Barbara Moore', checked: false },
    { name: 'Hendry Evan', checked: false },
    { name: 'Richard Miles', checked: false },
  ];
  users2 = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false },
  ];

  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }

}
