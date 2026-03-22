import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-membership-plans',
    templateUrl: './membership-plans.component.html',
    styleUrls: ['./membership-plans.component.scss'],
    standalone: false
})
export class MembershipPlansComponent {
  public routes = routes

}
