import { Component} from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.scss'],
    standalone: false
})
export class ModalsComponent {
  public routes = routes;
}
