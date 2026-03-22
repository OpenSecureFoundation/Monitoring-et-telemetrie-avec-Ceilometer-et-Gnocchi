import { Component, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DataService, routes } from 'src/app/core/core.index';
import { MenuItem } from 'src/app/core/models/models';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';

interface SubMenu {
  menuValue: string;
  route?: string;
  base?: string;
  showSubRoute?: boolean;
}

interface MainMenus {
  menu: SubMenu[];
}

interface SideBarData {

  mainMenus?: MainMenus[];
  active: boolean;
  icon: string;
  showAsTab: boolean;
  separateRoute: boolean;
  menu: MenuItem[];
  menuValue: string;
  showSubRoute: boolean;
  route: string;
  hasSubRoute: boolean;
  base: string;
  url:string;
  tittle:string;


}
interface url{
  url:string
}
@Component({
    selector: 'app-side-menu-one',
    templateUrl: './side-menu-one.component.html',
    styleUrls: ['./side-menu-one.component.scss'],
    standalone: false
})
export class SideMenuOneComponent implements OnDestroy {
  public routes = routes;
  public headerSidebarStyle = '1';
  public primarySkinStyle = '0';
  public mobileSidebar = false;
  public multilevel: Array<boolean> = [false, false, false];


  base = 'dashboard';
  page = '';
  last = '';
  currentRoute = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  side_bar_data:any[] = [];

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
    this.sideBar.toggleMobileSideBar.subscribe((res:string) => {
      if (res == "true") {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    // get sidebar data as observable because data is controlled for design to expand submenus
      this.data.getSideBarData.subscribe((res:SideBarData[]) => {
        this.side_bar_data = res;
    });
  }



  private getRoutes(route: url): void {
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

  public expandSubMenus(menu: { menuValue: string; showSubRoute: boolean; }): void {
    // console.log(menu,"main menu")
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: MainMenus) => {

      mainMenus.menu.map((resMenu) => {
        // collapse other submenus which are open
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  public navigateAuth(menuValue: string): void {
    //navigate to login page once authenticated
    if (menuValue == 'Authentication') localStorage.removeItem('authenticated');
  }

  ngOnDestroy(): void {
    this.sideBar.resetMiniSidebar();
  }
  public logOut(): void {
    // this.auth.logout();
  }

}
