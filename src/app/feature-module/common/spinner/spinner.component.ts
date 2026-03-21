import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/core/core.index';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
    standalone: false
})
export class SpinnerComponent {
  constructor(public spinner: SpinnerService) {}

  loading$ = this.spinner.loading$;


}
