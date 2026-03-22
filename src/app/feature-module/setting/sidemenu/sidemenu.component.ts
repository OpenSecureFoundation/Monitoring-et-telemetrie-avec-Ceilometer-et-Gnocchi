import { Component} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss'],
    standalone: false
})
export class SidemenuComponent  {
  url: string|number;
  public routes = routes;
  constructor(private router: Router) {
    this.url = this.router.url;
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url;
      }
    });
  }



  
}
