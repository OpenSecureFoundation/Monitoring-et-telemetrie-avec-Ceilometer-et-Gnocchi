import { Component } from '@angular/core';
import { CommonService, routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: false
})
export class SettingsComponent {
  public routes = routes;
  public currentRoute!: string;
  public base!: string;
  public page!: string;
  public last!: string;
  constructor(private common: CommonService) {
    this.common.currentRoute.subscribe((res:string) => {
      this.currentRoute = res;
    });
    this.common.pageRoute.subscribe((res:string) => {
      this.page = res?.replace('-', ' ');
    });
    this.common.baseRoute.subscribe((res:string) => {
      this.base = res?.replace('-', ' ');
    });
    this.common.lastRoute.subscribe((res:string) => {
      this.last = res?.replace('-', ' ');
    });
  }


}
