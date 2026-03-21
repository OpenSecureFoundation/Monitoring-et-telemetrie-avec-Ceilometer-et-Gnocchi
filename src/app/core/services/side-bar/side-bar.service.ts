import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data/data.service';
import { SideBar, SideBarMenu } from '../../models/models';
@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  public toggleSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMiniSidebar') || "false"
  );

  public toggleMobileSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMobileSidebar') || "false"
  );

  public expandSideBar: BehaviorSubject<string> = new BehaviorSubject<string>("false");

  public layoutPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutPosition') || '1'
  );
  public layoutDirection: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutDirection') || 'ltr'
  );
  public layoutColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutColor') || '1'
  );
  public layoutWidth: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutWidth') || '1'
  );
  public layoutTopColor: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutTopColor') || '1'
  );
  public layoutSidebarColor: BehaviorSubject<string> =
  new BehaviorSubject<string>(
    localStorage.getItem('layoutSidebarColor') || '1'
);
public layoutPositionScroll: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutPositionScroll') || '1'
)
public layoutSidebarSize: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('layoutSidebarSize') || '1'
)
public layoutSidebarView: BehaviorSubject<string> = new BehaviorSubject<string>(
  localStorage.getItem('layoutSidebarView') || '1'
)


  public headerSidebarStyle: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      localStorage.getItem('headerSidebarStyle') || '1'
    );
  public primarySkinStyle: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      localStorage.getItem('primarySkinStyle') || '0'
    );

  constructor(private data: DataService) {
    if (localStorage.getItem('isMiniSidebar') == 'true') {
      this.expandSideBar.next("false");
    } else {
      this.expandSideBar.next("true");
    }
  }

  public switchSideMenuPosition(): void {
    if (localStorage.getItem('isMiniSidebar')) {
      this.toggleSideBar.next("false");
      this.expandSideBar.next("true");
      localStorage.removeItem('isMiniSidebar'); 
      this.data.sideBar.map((mainMenus:SideBar) => {
        mainMenus.menu.map((resMenu: SideBarMenu) => {
          const menuValue = sessionStorage.getItem('menuValue'); 
          if (menuValue && menuValue == resMenu.menuValue) {
            resMenu.showSubRoute = true;
          }
        });
      });
    } else {
      this.toggleSideBar.next('true');
      this.expandSideBar.next("false");
      localStorage.setItem('isMiniSidebar', 'true');
      this.data.sideBar.map((mainMenus: SideBar) => {
        mainMenus.menu.map((resMenu: SideBarMenu) => {
          resMenu.showSubRoute = false;
        });
      });
    }
  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next("false");
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next("true");
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }
  // <* to check layout colors *>
  public changeColors(position: string): void {
    this.layoutColor.next(position);
    localStorage.setItem('layoutColor', position);
  }
  // <* to check layout Width *>
  public changeWidth(position: string): void {
    this.layoutWidth.next(position);
    localStorage.setItem('layoutWidth', position);
  }
   // <* to check layout sidebar color *>
   public changeSidebarColor(position: string): void {
    this.layoutSidebarColor.next(position);
    localStorage.setItem('layoutSidebarColor', position);
  }
  // <* to check layout color *>
  public changeTopcolor(position: string): void {
    this.layoutTopColor.next(position);
    localStorage.setItem('layoutTopColor', position);
  }
   // <* to check layout Scroll *>
   public changepositionscroll(position: string): void {
    this.layoutPositionScroll.next(position);
    localStorage.setItem('layoutPositionScroll', position);
    }
    // <* to check layout position *>
    public changeSidebarSize(position: string): void {
    this.layoutSidebarSize.next(position);
    localStorage.setItem('layoutSidebarSize', position);
    }
     // <* to check layout position *>
     public changeSidebarView(position: string): void {
      this.layoutSidebarView.next(position);
      localStorage.setItem('layoutSidebarView', position);
      }

  public changeLayout(position: string): void {
    this.layoutPosition.next(position);
    localStorage.setItem('layoutPosition', position);
  }
  public changeStyle(style: string): void {
    this.headerSidebarStyle.next(style);
    localStorage.setItem('headerSidebarStyle', style);
  }
  public changePrimarySkinStyle(style: string): void {
    if (localStorage.getItem('primarySkinStyle') == style) {
      this.primarySkinStyle.next('0');
      localStorage.setItem('primarySkinStyle', '0');
    } else {
      this.primarySkinStyle.next(style);
      localStorage.setItem('primarySkinStyle', style);
    }
  }

  public resetMiniSidebar(): void {
    this.toggleSideBar.next("false");
    this.toggleSideBar.next("false");
    localStorage.removeItem('isMiniSidebar');
  }
}
