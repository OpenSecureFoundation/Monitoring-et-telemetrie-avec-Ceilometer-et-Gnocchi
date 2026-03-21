import { Component } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
    standalone: false
})
export class TooltipComponent  {
  html = `<span class="btn-block btn-danger well-sm">Never trust not sanitized HTML!!!</span>`;
 

}
