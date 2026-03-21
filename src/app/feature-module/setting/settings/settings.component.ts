import { Component } from '@angular/core';
import { ToasterService } from 'src/app/core/core.index'; 

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: false
})
export class SettingsComponent {
  myDateValue!: Date;
  gender = "selectgender"
  public minDate!: Date;
  public maxDate!: Date;
  constructor(private toast: ToasterService) {}

  
  public submitForm(): void {
    this.toast.typeSuccess('Profile details edited successfully', 'Kanakku');
  }
}
