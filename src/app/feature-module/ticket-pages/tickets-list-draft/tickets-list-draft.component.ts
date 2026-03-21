import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-tickets-list-draft',
    templateUrl: './tickets-list-draft.component.html',
    styleUrls: ['./tickets-list-draft.component.scss'],
    standalone: false
})
export class TicketsListDraftComponent {
  public routes = routes;
  country = 'India';
}
