import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event } from '@angular/router';
import { SpinnerService } from './core/core.index';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppComponent {
  title = 'Kanakku';

  constructor(private spinner: SpinnerService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.spinner.hide();
        }, 800);
      }
    });
  }
}
