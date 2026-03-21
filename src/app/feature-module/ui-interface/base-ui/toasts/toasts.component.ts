import { Component,  } from '@angular/core';
import { ToasterService } from 'src/app/core/core.index';

@Component({
    selector: 'app-toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.scss'],
    standalone: false
})
export class ToastsComponent {
  constructor(private toaster: ToasterService) {}

  public typeSuccess() {
    this.toaster.typeSuccess('Have fun storming the castle!', 'Toaster fun!');
  }
  public typeInfo() {
    this.toaster.typeInfo('Have fun storming the castle!', 'Toaster fun!');
  }

  public typeWarning() {
    this.toaster.typeWarning('Have fun storming the castle!', 'Toaster fun!');
  }

  public typeError() {
    this.toaster.typeError('Have fun storming the castle!', 'Toaster fun!');
  }

  public topLeft() {
    this.toaster.topLeft(
      'I do not think that word means what you think it means.',
      'Top left'
    );
  }
  public topCenter() {
    this.toaster.topCenter(
      'I do not think that word means what you think it means.',
      'Top center'
    );
  }

  public topRight() {
    this.toaster.topRight(
      'I do not think that word means what you think it means.',
      'Top right'
    );
  }
  public fullWidth() {
    this.toaster.topFullWidth(
      'I do not think that word means what you think it means.',
      'Top full width'
    );
  }

  public bottomLeft() {
    this.toaster.bottomLeft('Have fun storming the castle!', 'Bottom Left');
  }

  public bottomCenter() {
    this.toaster.bottomCenter('Have fun storming the castle!', 'Bottom Center');
  }

  public bottomRight() {
    this.toaster.bottomRight('Have fun storming the castle!', 'Bottom Right');
  }

  public bottomFull() {
    this.toaster.bottomFullWidth(
      'Have fun storming the castle!',
      'Bottom full width'
    );
  }

  public notification() {
    this.toaster.notification('Have fun storming the castle!', 'Notification');
  }

  public closeButton() {
    this.toaster.closeButton('Have fun storming the castle!', 'Close Button');
  }

  public progressBar() {
    this.toaster.progressBar('Have fun storming the castle!', 'Progress Bar');
  }

  public clearToast() {
    this.toaster.clearToast('Have fun storming the castle!', 'Progress Bar');
  }

  public showRemove() {
    this.toaster.showRemove(
      'I do not think that word means what you think it means.',
      'Show Toast'
    );
  }

  public remove() {
    this.toaster.removeAllToast();
  }

  public fastDuration() {
    this.toaster.fastDuration(
      'I do not think that word means what you think it means.',
      'Show Toast',
      500
    );
  }

  public slowDuration() {
    this.toaster.slowDuration(
      'I do not think that word means what you think it means.',
      'Show Toast',
      1000
    );
  }

  public timeouts() {
    this.toaster.timeouts(
      'I do not think that word means what you think it means.',
      'Show Toast',
      300
    );
  }

  public stickys() {
    this.toaster.stickys(
      'I do not think that word means what you think it means.',
      'Show Toast',
      10000
    );
  }

}
