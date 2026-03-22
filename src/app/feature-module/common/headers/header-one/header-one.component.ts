import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';

import { routes } from 'src/app/core/core.index';
import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { Logout } from 'src/app/feature-module/authentication/store/actions.users';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss'],
  standalone: false,
})
export class HeaderOneComponent {
  public miniSidebar = false;
  public headerSidebarStyle = '1';
  public routes = routes;
  elem = document.documentElement;

  constructor(
    private sideBar: SideBarService,
    private router: Router,
    private store: Store
  ) {
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
    this.store.dispatch(new Logout());
  }
  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }
  public toggleMobileIcon(): void {
    this.sideBar.switchMobileSideBarPosition();
  }
  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
