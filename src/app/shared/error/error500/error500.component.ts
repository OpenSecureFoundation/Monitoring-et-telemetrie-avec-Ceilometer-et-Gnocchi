import { Component,} from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-error500',
    templateUrl: './error500.component.html',
    styleUrls: ['./error500.component.scss'],
    standalone: false
})
export class Error500Component {
  public routes = routes
 
}
