import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-company-settings',
    templateUrl: './company-settings.component.html',
    styleUrls: ['./company-settings.component.scss'],
    standalone: false
})
export class CompanySettingsComponent {
  public routes = routes
  files: File[] = [];
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event:File) {
   this.files.splice(this.files.indexOf(event), 1);
  }

}
