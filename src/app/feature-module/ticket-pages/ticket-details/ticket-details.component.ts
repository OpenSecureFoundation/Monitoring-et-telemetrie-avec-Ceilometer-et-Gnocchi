import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-ticket-details',
    templateUrl: './ticket-details.component.html',
    styleUrls: ['./ticket-details.component.scss'],
    standalone: false
})
export class TicketDetailsComponent {
  public routes = routes;
  selectValue1 = 'dataValue1';
  selectValue2 = 'dataValue1';
  selectValue3 = 'dataValue1';
  selectValue4 = 'dataValue1';
  selectValue5 = 'dataValue1';

  public toggleData = false;

  openContent() {
    this.toggleData = !this.toggleData;
  }
}
