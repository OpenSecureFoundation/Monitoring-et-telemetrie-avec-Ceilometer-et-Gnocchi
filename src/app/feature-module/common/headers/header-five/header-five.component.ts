import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService, routes,SideBarService,} from 'src/app/core/core.index';
import {MenuItem,RouterObject, SideBarData,
} from 'src/app/core/models/models';

@Component({
    selector: 'app-header-five',
    templateUrl: './header-five.component.html',
    styleUrls: ['./header-five.component.scss'],
    standalone: false
})
export class HeaderFiveComponent {
  public miniSidebar = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public side_bar_data: Array<any> = [];
  public headerSidebarStyle = '1';
  public routes = routes;
  elem = document.documentElement;

  base = 'dashboard';
  page = '';
  last = '';
  currentRoute = '';
  constructor(
    // private auth: AuthService,
    private sideBar: SideBarService,
    private data: DataService,
    public router: Router
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);

    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    // get sidebar data as observable because data is controlled for design to expand submenus
    this.data.getSideBarData.subscribe((sideBarData: SideBarData[]) => {
      sideBarData.forEach((mainMenu: SideBarData) => {
        mainMenu.showAsTab = false;

        if (['Main', 'Pages', 'UI Interface'].includes(mainMenu.tittle)) {
          this.side_bar_data.push(mainMenu);
        }



        if (
          !['Main', 'Customers', 'UI Interface', 'Pages'].includes(
            mainMenu.tittle
          )
        ) {
          this.side_bar_data[0].menu.push(...mainMenu.menu);
        }
      });
    });
    this.sideBar.headerSidebarStyle.subscribe((res: string) => {
      this.headerSidebarStyle = res;
    });
  }

  private getRoutes(route: RouterObject): void {
    const splitVal = route.url.split('/');
    this.currentRoute = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
  }
  public logOut(): void {
    // this.auth.logout();
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }

  public mobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  public expandSubMenus(menu: MenuItem): void {
    this.side_bar_data.map((mainMenus: SideBarData) => {
      mainMenus.menu.map((resMenu: MenuItem) => {
        // collapse other submenus which are open
        if (resMenu.menuValue == menu.menuValue) {
          resMenu.showSubRoute = !resMenu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  public showDropDown(menu: SideBarData): void {
    this.side_bar_data.map((mainMenus: SideBarData) => {
      // collapse other dropdown which are open
      if (mainMenus.tittle == menu.tittle) {
        mainMenus.showAsTab = !mainMenus.showAsTab;
        mainMenus.active = true;
      } else {
        mainMenus.showAsTab = false;
        mainMenus.active = false;
      }
    });
  }
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
