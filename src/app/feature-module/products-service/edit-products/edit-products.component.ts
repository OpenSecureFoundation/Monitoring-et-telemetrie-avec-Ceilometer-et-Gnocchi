import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-edit-products',
    templateUrl: './edit-products.component.html',
    styleUrls: ['./edit-products.component.scss'],
    standalone: false
})
export class EditProductsComponent {
  public routes = routes;
  files: File[] = [];
  Units='select units'
  Discount='select discount'
  Tax='select tax'

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    sanitize: false,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };
  onSelect(event: { addedFiles: File[] }) {
    this.files.push(...event.addedFiles);
  }
  onRemove(event:File) {
   this.files.splice(this.files.indexOf(event), 1);
  }



}
