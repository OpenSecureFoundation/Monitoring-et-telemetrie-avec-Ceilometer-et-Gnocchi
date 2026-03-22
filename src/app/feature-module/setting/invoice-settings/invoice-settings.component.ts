import { Component } from '@angular/core';

@Component({
    selector: 'app-invoice-settings',
    templateUrl: './invoice-settings.component.html',
    styleUrls: ['./invoice-settings.component.scss'],
    standalone: false
})
export class InvoiceSettingsComponent {
  files: File[] = [];
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event:File) {
   this.files.splice(this.files.indexOf(event), 1);
  }
}
