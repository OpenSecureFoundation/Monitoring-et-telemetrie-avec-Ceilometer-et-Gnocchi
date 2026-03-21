import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { MenuItem, SideBar, SideBarMenu } from 'src/app/core/models/models';
// import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DataService } from 'src/app/core/services/data/data.service';
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
    selector: 'app-side-menu-five',
    templateUrl: './side-menu-five.component.html',
    styleUrls: ['./side-menu-five.component.scss'],
    standalone: false
})
export class SideMenuFiveComponent {
  public routes = routes;
  showMoreMenu = false;
  public headerSidebarStyle = '1';
  public primarySkinStyle = '0';
  public mobileSidebar = false;

  base = 'dashboard';
  page = '';
  last = '';
  currentRoute = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  side_bar_data:any[] = [];

  private getRoutes(route: url): void {
    const splitVal = route.url.split('/');
    this.currentRoute = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
  }



  public expandSubMenus(menu: SideBarMenu): void {
    if (
      menu.menuValue === 'Dashboard' ||
      menu.menuValue === 'Applications' ||
      menu.menuValue === 'Super Admin' ||
      menu.menuValue === 'Customers' ||
      menu.menuValue === 'Inventory'
    ) {
      this.showMoreMenu = false;
    }

    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: SideBar) => {
      mainMenus.menu.map((resMenu: SideBarMenu) => {
        // collapse other submenus which are open
        if (resMenu.menuValue === menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
          if (menu.showSubRoute === false) {
            sessionStorage.removeItem('menuValue');
          }
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
  public openMoreMenus(): void {
    this.showMoreMenu = !this.showMoreMenu;
    this.side_bar_data.map((mainMenus: SideBar) => {
      mainMenus.menu.map((resMenu: SideBarMenu) => {
        // collapse other submenus which are open
        const menuValue = sessionStorage.getItem('menuValue');
        if (
          menuValue &&
          menuValue === resMenu.menuValue &&
          (menuValue !== 'Dashboard' )
        ) {
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Applications'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Super Admin'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Customers'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else if( menuValue &&   menuValue === resMenu.menuValue &&  menuValue !== 'Products / Services'){
          resMenu.showSubRoute = !resMenu.showSubRoute;
        }
        else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }



}
