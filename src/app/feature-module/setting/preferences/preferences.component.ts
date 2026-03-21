import { Component } from '@angular/core';

@Component({
    selector: 'app-preferences',
    templateUrl: './preferences.component.html',
    styleUrls: ['./preferences.component.scss'],
    standalone: false
})
export class PreferencesComponent  {
 
  discount = false
  currency ="selectcurrency"
  language = "selectedlanguage"
  time = "timezone"
  date ="dateformat"
  date1 = "date2"
  finalyear = "finalyear"
  

}
