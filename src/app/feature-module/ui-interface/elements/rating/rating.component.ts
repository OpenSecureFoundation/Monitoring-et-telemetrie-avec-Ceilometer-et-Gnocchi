import { Component } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    standalone: false
})
export class RatingComponent{
  basicStar:  Array<{ show: boolean }> = [
    { show: false },
    { show: false },
    { show: false },
    { show: false },
    { show: false },
  ];
  savedStar:  Array<{ show: boolean }> = [
    { show: true },
    { show: true },
    { show: true },
    { show: false },
    { show: false },
  ];
  maxStar:  Array<{ show: boolean }> = [
    { show: false },
    { show: false },
    { show: false },
    { show: false },
    { show: false },
    { show: false },
    { show: false },
    { show: false },
  ];
  readOnlyStar:  Array<{ show: boolean }> = [
    { show: true },
    { show: true },
    { show: true },
    { show: false },
    { show: false },
  ];
  halfRatingStar: Array<{ show: boolean; half: boolean }> = [
    { show: true, half: false },
    { show: true, half: false },
    { show: false, half: true },
    { show: false, half: false },
    { show: false, half: false },
  ];
  heartIcon:  Array<{ show: boolean }> = [
    { show: false },
    { show: false },
    { show: false },
    { show: false },
    { show: false },
  ];
 
  clickBasicStar(item: { show: boolean }, i: number, array: Array<{ show: boolean; half?: boolean }>): void {
    if (!item.show) {
      array.forEach((res, index) => {
        if (index <= i) {
          res.show = true;
        }
      });
    } else {
      array.forEach((res, index) => {
        if (index >= i && index !== 0) {
          res.show = false;
        }
      });
    }
    if (array === this.halfRatingStar) {
      array.forEach((res) => {
        res.half = false;
      });
    }

 
}
}
