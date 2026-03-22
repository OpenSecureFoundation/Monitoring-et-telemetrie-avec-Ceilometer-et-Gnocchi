import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


import {
  // AuthService,
  CommonService,
  DataService,
  routes,
} from '../core/core.index';
import { SideBarService } from '../core/services/side-bar/side-bar.service';
import { MenuItem, RouterObject, mainMenu, mainMenus } from '../core/models/models';

@Component({
    selector: 'app-feature-module',
    templateUrl: './feature-module.component.html',
    styleUrls: ['./feature-module.component.scss'],
    // encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class FeatureModuleComponent implements OnDestroy {
  public toggle = false;
  public authenticated = false;
  public miniSidebar = false;
  public expandMenu : boolean | string= false;
  public mobileSidebar = false;
  public layoutSidebarColor = '1';
  public layoutTopColor = '1';
  public layoutPosition = '';
  public layoutDirection = '';
  public layoutColor = '1';
  public layoutWidth = '1';
  public layoutSidebarSize = '1';
  public layoutSidebarView = '1';

  public base = '';
  public page = '';
  public last = '';

  public routes = routes;
  public hideheader =false;
  public sidebar =false;
  public stickysidebar =false;

  constructor(
    // private auth: AuthService,
    private sideBar: SideBarService,
    public router: Router,
    private data: DataService,
    private common: CommonService
  ) {
    this.getRoutes(this.router);

    this.common.baseRoute.subscribe((res: string) => {
      this.base = res?.replace('-', ' ');
    });
    this.common.pageRoute.subscribe((res: string) => {
      this.page = res?.replace('-', ' ');
    });
    this.common.lastRoute.subscribe((res: string) => {
      this.last = res?.replace('-', ' ');
    });
    // <* condition to check weather login *>
    // this.auth.checkAuth.subscribe((res: string) => {
    //   if (res == 'true') {
    //     this.authenticated = true;
    //   } else {
    //     this.authenticated = false;
    //   }
    // });

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
        localStorage.removeItem('isMobileSidebar');
        this.mobileSidebar = false;

        // <* to check session time *>
        this.sessionOut();
        // <* to check session time *>
      }
    });
    // <* condition to check weather login *>

    // <* condition to check side bar position *>
    this.sideBar.toggleSideBar.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    // <* condition to check side bar position *>

    // <* condition to check mobile side bar position *>
    this.sideBar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == "true") {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    // <* condition to check mobile side bar position *>
    this.sideBar.expandSideBar.subscribe((res:  boolean | string) => {
      this.expandMenu = res;
      // <* to collapse submenu while toggling side menu*>
      if (res == false && this.miniSidebar == true) {
        this.data.sideBar.map((mainMenus: mainMenus) => {
          mainMenus.menu.map((resMenu: MenuItem) => {
            resMenu.showSubRoute = false;
          });
        });
      }
      // <* to expand submenu while hover toggled side menu*>
      if (res == true && this.miniSidebar == false) {
        this.data.sideBar.map((mainMenus: mainMenu) => {
          mainMenus.menu.map((resMenu: MenuItem) => {
            const menuValue = sessionStorage.getItem('menuValue');
            if (menuValue && menuValue == resMenu.menuValue) {
              resMenu.showSubRoute = true;
            } else {
              resMenu.showSubRoute = false;
            }
          });
        });
      }
    });
    // <* to check layout position *>
    this.sideBar.layoutPosition.subscribe((res: string) => {
      this.layoutPosition = res;
    });
     // <* to check layout colors *>
     this.sideBar.layoutColor.subscribe((res: string) => {
      this.layoutColor = res;
    });
     // <* to check layout topcolor *>
     this.sideBar.layoutTopColor.subscribe((res: string) => {
      this.layoutTopColor = res;
    });
    // <* to check layout width *>
    this.sideBar.layoutWidth.subscribe((res: string) => {
      this.layoutWidth = res;
    });
    // <* to check layout position *>
    // <* to check layout direction *>
    this.sideBar.layoutDirection.subscribe((res: string) => {
      this.layoutDirection = res;
    });
     // <* to check layout color *>
     this.sideBar.layoutSidebarColor.subscribe((res: string) => {
      this.layoutSidebarColor = res;
    });
    // <* to check layout view *>
    this.sideBar.layoutSidebarView.subscribe((res: string) => {
      this.layoutSidebarView = res;
    });
    // <* to check layout width *>
    this.sideBar.layoutSidebarSize.subscribe((res: string) => {
      this.layoutSidebarSize = res;
    });
    // <* to check layout direction *>
    // <* to check session time *>
    this.sessionOut();
    // <* to check session time *>
  }



  ngOnDestroy(): void {
    sessionStorage.clear();
  }

  public getScrollContentPages(): boolean {
    if (
      this.base == 'dashboard' ||
      this.base == 'customer' ||
      this.page == 'categories' ||
      this.base == 'reports' ||
      this.base == 'expenses' ||
      this.base == 'payments' ||
      this.base == 'estimates' ||
      this.base == 'invoices'
    )
      return false;
    else return true;
  }

  private getRoutes(route: RouterObject): void {
    const splitVal =  route?.url.split('/');
    this.common.currentRoute.next(route.url);
    this.common.baseRoute.next(splitVal[1]);
    this.common.pageRoute.next(splitVal[2]);
    this.common.lastRoute.next(splitVal[3]);

    if (
      this.base == 'login' ||
      this.base == 'forgot-password' ||
      this.base == 'register' ||
      this.base == 'lock-screen' ||
      this.base == ''
    ) {
      this.authenticated = false;
    } else {
      this.authenticated = true;
    }
    if (this.base == 'rtl' && this.page == 'login') {
      this.authenticated = false;
    }
    // header hide
     if(
      (this.common.pageRoute.getValue() == 'general-invoice1')||
      (this.common.pageRoute.getValue() == 'general-invoice2')||
      (this.common.pageRoute.getValue() == 'general-invoice3')||
      (this.common.pageRoute.getValue() == 'general-invoice4')||
      (this.common.pageRoute.getValue() == 'general-invoice5')||
      (this.common.pageRoute.getValue() == 'bus-ticket')||
      (this.common.pageRoute.getValue() == 'car-booking-invoice')||
      (this.common.pageRoute.getValue() == 'coffee-shop')||
      (this.common.pageRoute.getValue() == 'domain-hosting')||
      (this.common.pageRoute.getValue() == 'ecommerce')||
      (this.common.pageRoute.getValue() == 'fitness-center')||
      (this.common.pageRoute.getValue() == 'train-ticket-booking')||
      (this.common.pageRoute.getValue() == 'flight-booking-invoice')||
      (this.common.pageRoute.getValue() == 'hotel-booking')||
      (this.common.pageRoute.getValue() == 'internet-billing')||
      (this.common.pageRoute.getValue() == 'medical')||
      (this.common.pageRoute.getValue() == 'moneyexchange')||
      (this.common.pageRoute.getValue() == 'movie-ticket-booking')||
      (this.common.pageRoute.getValue() == 'restuarent-billing')||
      (this.common.pageRoute.getValue() == 'student-billing')||
      (this.common.pageRoute.getValue() == 'cashreceipt1')||
      (this.common.pageRoute.getValue() == 'cashreceipt2')||
      (this.common.pageRoute.getValue() == 'cashreceipt3')||
      (this.common.pageRoute.getValue() == 'cashreceipt4')||
      (this.common.pageRoute.getValue() == 'invoice-one')||
      (this.common.pageRoute.getValue() == 'invoice-one-a')||
      (this.common.pageRoute.getValue() == 'invoice-two')||
      (this.common.pageRoute.getValue() == 'invoice-three')||
      (this.common.pageRoute.getValue() == 'invoice-four')||
      (this.common.pageRoute.getValue() == 'invoice-four-a')||
      (this.common.pageRoute.getValue() == 'invoice-five')||
      (this.common.pageRoute.getValue() == 'signature-preview-invoice')||
      (this.common.baseRoute.getValue() == 'pay-online')||
      (this.common.baseRoute.getValue() == 'mail-pay-invoice') ||
      (this.common.pageRoute.getValue() == 'invoice-subscription')
     ){
       this.hideheader = false;
     } else {
       this.hideheader = true;
     }
    // sidebar hide
    if(
      (this.common.pageRoute.getValue() == 'general-invoice1')
    )
    {
      this.sidebar = false;
    }else {
      this.sidebar = true ;
    }
    //rightsideview hide
    if(
      (this.common.pageRoute.getValue() == 'invoice-two')||
      (this.common.pageRoute.getValue() == 'invoice-one')||
      (this.common.pageRoute.getValue() == 'invoice-three')||
      (this.common.pageRoute.getValue() == 'invoice-four')||
      (this.common.pageRoute.getValue() == 'invoice-five')||
      (this.common.pageRoute.getValue() == 'invoice-one-a')||
      (this.common.pageRoute.getValue() == 'invoice-four-a')||
      (this.common.pageRoute.getValue() == 'cashreceipt1')||
      (this.common.pageRoute.getValue() == 'cashreceipt2')||
      (this.common.pageRoute.getValue() == 'cashreceipt3')||
      (this.common.pageRoute.getValue() == 'cashreceipt4')
    )
    {
      this.stickysidebar = false;
    }else {
      this.stickysidebar  = true ;
    }

  }

  private sessionOut(): void {
    const loginTime: Date|string = localStorage.getItem('timeOut') || Date();
    // convert to date object
    const timeOut: Date = new Date(loginTime);

    if (new Date().getHours() > timeOut.getHours()) {
      // this.auth.logout();
    }

  }

  public toggleMobileIcon(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  expandMenuCondition(): boolean {
    return this.mobileSidebar && this.authenticated && this.miniSidebar;
  }
  // handleMouseEnter(event: MouseEvent): void {
  //   if (this.expandMenuCondition()) {
  //     const target = event.target as HTMLElement;
  //     const closestSidebar = target.closest('.sidebar');

  //     if (closestSidebar) {
  //       // Handle adding classes and sliding down
  //     } else {
  //       // Handle removing classes and sliding up
  //     }
  //   }
  // }

}
