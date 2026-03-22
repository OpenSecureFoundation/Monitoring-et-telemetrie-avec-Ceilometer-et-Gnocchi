import { Component,ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-horizontal',
    templateUrl: './horizontal.component.html',
    styleUrls: ['./horizontal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class HorizontalComponent  {
  public dates: Array<string> = [
    '12 Jan',
    '10 Feb',
    '22 Mar',
    '28 Apr',
    '02 May',
    '28 Jun',
    '04 Jul',
  ];

  
}
