import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-tickets-list-overdue',
    templateUrl: './tickets-list-overdue.component.html',
    styleUrls: ['./tickets-list-overdue.component.scss'],
    standalone: false
})
export class TicketsListOverdueComponent {
  public routes = routes;
  country = 'India';
}
