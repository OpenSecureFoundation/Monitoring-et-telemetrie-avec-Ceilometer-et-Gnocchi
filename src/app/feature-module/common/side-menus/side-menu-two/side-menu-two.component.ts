import { Component, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { DataService, routes } from 'src/app/core/core.index';
import { MenuItem,RouterObject,SideBarData,mainMenus, subMenus} from 'src/app/core/models/models';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

@Component({
    selector: 'app-side-menu-two',
    templateUrl: './side-menu-two.component.html',
    styleUrls: ['./side-menu-two.component.scss'],
    standalone: false
})
export class SideMenuTwoComponent implements OnDestroy {
  public routes = routes;
  public headerSidebarStyle = '1';
  public primarySkinStyle = '1';

  base = 'dashboard';
  page = '';
  last = '';
  currentRoute = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  side_bar_data: Array<any> = [];

  constructor(
    public router: Router,
    private data: DataService,
    private sideBar: SideBarService,
    // private auth: AuthService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
    this.sideBar.headerSidebarStyle.subscribe((res: string) => {
      this.headerSidebarStyle = res;
    });
    this.sideBar.primarySkinStyle.subscribe((res: string) => {
      this.primarySkinStyle = res;
    });
    // get sidebar data as observable because data is controlled for design to expand submenus
    this.data.getSideBarData.subscribe((res: SideBarData[]) => {
      this.side_bar_data = res;
    });

  }



  private getRoutes(route:RouterObject): void {
    const splitVal = route.url.split('/');
    this.currentRoute = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sideBar.expandSideBar.next("true");
    } else {
      this.sideBar.expandSideBar.next("false");
    }
  }

  public expandSubMenus(menu: subMenus): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus:mainMenus) => {
      mainMenus.menu.map((resMenu: MenuItem) => {
        // collapse other submenus which are open
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.sideBar.resetMiniSidebar();
  }
  public logOut(): void {
    // this.auth.logout();
  }
  public navigateAuth(menuValue: string): void {
    //navigate to login page once authenticated
    if (menuValue == 'Authentication') localStorage.removeItem('authenticated');
  }
}
