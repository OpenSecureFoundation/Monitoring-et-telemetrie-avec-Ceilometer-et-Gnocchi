import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
    selector: 'app-edit-faq',
    templateUrl: './edit-faq.component.html',
    styleUrls: ['./edit-faq.component.scss'],
    standalone: false
})
export class EditFaqComponent {
  public routes = routes 

}
