import { Component } from '@angular/core';

@Component({
    selector: 'app-sass-settings',
    templateUrl: './sass-settings.component.html',
    styleUrl: './sass-settings.component.scss',
    standalone: false
})
export class SassSettingsComponent {
  public paymentmode = "payment1"
}
