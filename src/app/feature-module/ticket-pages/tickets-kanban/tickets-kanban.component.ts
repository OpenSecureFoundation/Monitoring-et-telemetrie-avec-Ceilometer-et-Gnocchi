import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';
interface data {
  value: string;
}
@Component({
    selector: 'app-tickets-kanban',
    templateUrl: './tickets-kanban.component.html',
    styleUrls: ['./tickets-kanban.component.scss'],
    standalone: false
})
export class TicketsKanbanComponent {
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';

  priority = "selectpriority"
  myDateValue!: Date;
  sort = "sort1"
  public minDate!: Date;
  public maxDate!: Date;
  selectstatus = "select"
  public tickets: Array<string> = [];
  country = 'India';
  public routes = routes;
  status = 'status1'
  isCollapsed1 = false;
  isCollapsed2 = false;
  
  selectedList1: data[] = [
    { value: 'Sort by:Date' },
    { value: 'Sort by:Date 1' },
    { value: 'Sort by:Date 2' },
  ];
  selectedList2: data[] = [
    { value: 'Select Priority' },
    { value: 'Medium' },
    { value: 'Low' },
    { value: 'High' },
  ];
  selectedList3: data[] = [
    { value: 'Select Status' },
    { value: 'Open' },
    { value: 'Resolved' },
    { value: 'Pending' },
    { value: 'Closed' },
  ];
  selectedList4: data[] = [
    { value: 'Select Priority' },
    { value: 'Medium' },
    { value: 'Low' },
    { value: 'High' },
  ];
  selectedList5: data[] = [
    { value: 'Select Status' },
    { value: 'Open' },
    { value: 'Resolved' },
    { value: 'Pending' },
    { value: 'Closed' },
  ];
  users = [
    { name: 'Barbara Moore', checked: false },
    { name: 'Hendry Evan', checked: false },
    { name: 'Richard Miles', checked: false }
  ];
  usersTwo = [
    { name: 'Stationary', checked: false },
    { name: 'Medical', checked: false },
    { name: 'Designing', checked: false }
  ];
  
  public toggleData = false;
  isCollapsed = false;
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  openContent() {
    this.toggleData = !this.toggleData;
  }
  users2 = [
    { name: 'Esther', checked: false },
    { name: 'Walter', checked: false },
  ];
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
}
