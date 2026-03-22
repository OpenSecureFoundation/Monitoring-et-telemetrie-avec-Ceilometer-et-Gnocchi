import { Component} from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-blog-details',
    templateUrl: './blog-details.component.html',
    styleUrls: ['./blog-details.component.scss'],
    standalone: false
})
export class BlogDetailsComponent {
  public routes = routes;

}
