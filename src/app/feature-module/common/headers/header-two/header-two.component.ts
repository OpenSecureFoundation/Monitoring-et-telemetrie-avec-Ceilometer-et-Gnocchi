import { Component } from '@angular/core';

import { routes } from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
    selector: 'app-header-two',
    templateUrl: './header-two.component.html',
    styleUrls: ['./header-two.component.scss'],
    standalone: false
})
export class HeaderTwoComponent  {
  public miniSidebar = false;
  public headerSidebarStyle = '1';
  public routes = routes;
  elem=document.documentElement

  constructor(private sideBar: SideBarService) {
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.sideBar.headerSidebarStyle.subscribe((res: string) => {
      this.headerSidebarStyle = res;
    });
  }



  public logOut(): void {
    // this.auth.logout();
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileIcon(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  fullscreen() {
    if(!document.fullscreenElement) {
      this.elem.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  }
}
