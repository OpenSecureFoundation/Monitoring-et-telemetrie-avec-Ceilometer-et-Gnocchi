import { Component,  OnDestroy,  ViewEncapsulation } from '@angular/core';
import { NavigationEnd,Router } from '@angular/router';
import { routes, DataService, SideBarService } from 'src/app/core/core.index'
import { Menu, RouterObject, SideBarData, mainMenus, subMenus } from 'src/app/core/models/models';
interface MainTitle {
  tittle: string;

}
interface MenuItem {
  menuValue: string;
  subMenus?: subMenus[];
  base:string
}
@Component({
    selector: 'app-side-menu-four',
    templateUrl: './side-menu-four.component.html',
    styleUrls: ['./side-menu-four.component.scss'],
    // encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SideMenuFourComponent implements OnDestroy {
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
    this.data.getSideBarData.subscribe((sideBarData: SideBarData[]) => {
      sideBarData.forEach((mainMenu:SideBarData, mainMenuIndex: number) => {
         mainMenu.showAsTab = false;

        if (['Main', 'Pages', 'UI Interface'].includes(mainMenu.tittle)) {
          this.side_bar_data.push(mainMenu);
        }

        mainMenu.menu.forEach((menu:MenuItem) => {
          if (menu.menuValue === 'Application') {
            this.side_bar_data.push(...(menu.subMenus || []));
          }

          if (this.base === menu.base) {
            this.side_bar_data[mainMenuIndex].showAsTab = true;
          }
        });

        if (
          !['Main', 'Customers', 'UI Interface', 'Pages'].includes(
            mainMenu.tittle
          )
        ) {
          this.side_bar_data[0].menu.push(...mainMenu.menu);
        }
      });
    });
  }



  private getRoutes(route: RouterObject): void {
    const splitVal = route.url.split('/');
    this.currentRoute = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
  }
  public showTabs(mainTitle: MainTitle): void {
    console.log(mainTitle,"main title")
    const { tittle } = mainTitle;
    const isSpecialTab = ['Chat', 'Email', 'Calendar'].includes(tittle);
    const specialTabIndex = isSpecialTab ? 0 : -1;

    this.side_bar_data.forEach((mainMenu, index) => {
      mainMenu.showAsTab =
        (isSpecialTab && index === specialTabIndex) ||
        mainMenu.tittle === tittle;
    });
  }

  public expandSubMenus(menu:subMenus): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.map((mainMenus: mainMenus) => {
      mainMenus.menu?.map((resMenu:Menu) => {
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
    //  this.data.resetData();
    this.sideBar.resetMiniSidebar();
  }
  public logOut(): void {
    // this.auth.logout();
  }
}
