import { Component } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { routes } from 'src/app/core/core.index';
import { MatChipInputEvent } from '@angular/material/chips';
interface Tag {
  name: string;
}
@Component({
    selector: 'app-edit-blogs',
    templateUrl: './edit-blogs.component.html',
    styleUrls: ['./edit-blogs.component.scss'],
    standalone: false
})
export class EditBlogsComponent  {
  public routes = routes;

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
 
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [{ name: 'Tag 1' }, { name: 'Tag 2' }, { name: 'Tag 3' }];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.tags.push({ name: value });
    }

    // Clear the input value
    event.chipInput.clear();
  }

  remove(item: Tag): void {
    const index = this.tags.indexOf(item);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  // ** tag
}
