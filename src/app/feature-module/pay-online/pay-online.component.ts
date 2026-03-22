import { Component } from '@angular/core';

@Component({
    selector: 'app-pay-online',
    templateUrl: './pay-online.component.html',
    styleUrls: ['./pay-online.component.scss'],
    standalone: false
})
export class PayOnlineComponent {
  public minDate!: Date;
  public maxDate!: Date;
  myDateValue!: Date;

}
