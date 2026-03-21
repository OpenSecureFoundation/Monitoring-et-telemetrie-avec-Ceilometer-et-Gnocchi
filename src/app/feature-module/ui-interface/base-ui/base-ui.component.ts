import { Component} from '@angular/core';

@Component({
    selector: 'app-base-ui',
    templateUrl: './base-ui.component.html',
    styleUrls: ['./base-ui.component.scss'],
    standalone: false
})
export class BaseUIComponent {
  public page = '';
  public base = '';
  public layoutPosition = '';

  // constructor(private common: CommonService, private sideBar: SideBarService) {
  //   this.common.pageRoute.subscribe((res: string) => {
  //     this.page = res.replace('-', ' ');
  //   });
  //   this.common.baseRoute.subscribe((res: string) => {
  //     this.base = res.replace('-', ' ');
  //   });
  //   // <* to check layout position *>
  //   this.sideBar.layoutPosition.subscribe((res: string) => {
  //     this.layoutPosition = res;
  //   });
  //   // <* to check layout position *>
  // }

  
}
