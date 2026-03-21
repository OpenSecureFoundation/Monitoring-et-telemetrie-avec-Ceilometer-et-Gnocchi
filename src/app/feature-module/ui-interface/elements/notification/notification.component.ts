import { Component} from '@angular/core';
import { ToasterService } from 'src/app/core/core.index';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
    standalone: false
})
export class NotificationComponent  {
  constructor(private toast: ToasterService) {}



  cancel(): void {
    this.toast.typeError('Your Imaginary file is safe :)', 'Canceled');
  }
  confirm(): void {
    this.toast.typeSuccess('Your Imaginary file is removed :)', 'Completed');
  }

  public typeSuccess() {
    this.toast.typeSuccess('Have fun storming the castle!', 'Toaster fun!');
  }
  public typeInfo() {
    this.toast.typeInfo('Have fun storming the castle!', 'Toaster fun!');
  }

  public typeWarning() {
    this.toast.typeWarning('Have fun storming the castle!', 'Toaster fun!');
  }

  public typeError() {
    this.toast.typeError('Have fun storming the castle!', 'Toaster fun!');
  }
}
