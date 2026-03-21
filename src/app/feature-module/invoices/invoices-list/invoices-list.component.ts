import { Component } from '@angular/core';
import { routes, CommonService } from 'src/app/core/core.index';

@Component({
    selector: 'app-invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss'],
    standalone: false
})
export class InvoicesListComponent {
  public routes = routes;
  currentRoute!: string;
  public base!: string;
  public page!: string;
  public last!: string;
  constructor(private common: CommonService) {
    this.common.currentRoute.subscribe((res: string) => {
      this.currentRoute = res;
    });
    this.common.pageRoute.subscribe((res: string) => {
      this.page = res?.replace('-', ' ');
    });
    this.common.baseRoute.subscribe((res: string) => {
      this.base = res?.replace('-', ' ');
    });
    this.common.lastRoute.subscribe((res: string) => {
      this.last = res?.replace('-', ' ');
    });
  }
}
