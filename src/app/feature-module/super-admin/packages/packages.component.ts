import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';
interface data {
  value: string;
}
@Component({
    selector: 'app-packages',
    templateUrl: './packages.component.html',
    styleUrls: ['./packages.component.scss'],
    standalone: false
})
export class PackagesComponent {
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';

  selectedList1: data[] = [
    { value: 'Monthly' },
    { value: 'Yearly' },
    { value: 'Free Trail' },
  ];
  selectedList2: data[] = [
    { value: 'Fixed' },
    { value: 'Percentage' }
  ];
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}
