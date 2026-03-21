import { Component} from '@angular/core';
import { routes, SideBarService } from 'src/app/core/core.index';

@Component({
    selector: 'app-header-three',
    templateUrl: './header-three.component.html',
    styleUrls: ['./header-three.component.scss'],
    standalone: false
})
export class HeaderThreeComponent  {
  public miniSidebar = false;
  public headerSidebarStyle = '1';
  public routes = routes;
  elem=document.documentElement

  constructor( private sideBar: SideBarService) {
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
