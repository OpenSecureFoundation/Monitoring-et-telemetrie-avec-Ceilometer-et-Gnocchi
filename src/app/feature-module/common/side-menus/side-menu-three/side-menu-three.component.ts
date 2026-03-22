import { Component, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes, DataService, SideBarService } from 'src/app/core/core.index';
import { SideBarData, subMenus, mainMenus, Menu, RouterObject} from 'src/app/core/models/models';

@Component({
    selector: 'app-side-menu-three',
    templateUrl: './side-menu-three.component.html',
    styleUrls: ['./side-menu-three.component.scss'],
    standalone: false
})
export class SideMenuThreeComponent implements OnDestroy {
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
    private sideBar: SideBarService
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

 

  private getRoutes(route: RouterObject): void {
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
    this.side_bar_data.map((mainMenus: mainMenus) => {
      mainMenus.menu.map((resMenu: Menu) => {
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
}
