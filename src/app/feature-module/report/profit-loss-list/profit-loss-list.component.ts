import { Component } from '@angular/core';
interface data {
  value: string;
}
@Component({
    selector: 'app-profit-loss-list',
    templateUrl: './profit-loss-list.component.html',
    styleUrls: ['./profit-loss-list.component.scss'],
    standalone: false
})
export class ProfitLossListComponent {
  public toggleData  = false;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  isCollapsed2 = false;
  isCollapsed1 = false;

  selectedList1: data[] = [
    { value: 'This Year' }
  ];
  selectedList2: data[] = [
    { value: 'Accrual' }
  ];
  selectedList3: data[] = [
    { value: 'Month' }
  ];
  openContent() {
    this.toggleData = !this.toggleData;
  }
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }
  users1 = [
    { name: 'Pricilla', checked: false },
    { name: 'Randall', checked: false }
  ];
}
