import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Editor, Toolbar, Validators } from 'ngx-editor';

@Component({
    selector: 'app-email-template',
    templateUrl: './email-template.component.html',
    styleUrl: './email-template.component.scss',
    standalone: false
})
export class EmailTemplateComponent {
 
  editor1!: Editor;
  editor2!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form1 = new FormGroup({
    editorContent: new FormControl( ), 
  });

  form2 = new FormGroup({
    editorContent: new FormControl( ), 
  });

  ngOnInit(): void {
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.form1.get('editorContent')?.valueChanges.subscribe(value => {
      this.updateTextareaValue(value, 1);
    });
    this.form2.get('editorContent')?.valueChanges.subscribe(value => {
      this.updateTextareaValue(value, 2);
    });
  }

  ngOnDestroy(): void {
    this.editor1.destroy();
    this.editor2.destroy();
  }

  
  updateTextareaValue(content: string, editorNumber: number): void {
    const form = editorNumber === 1 ? this.form1 : this.form2;
    form.patchValue({
      editorContent: content
    });
  }

}
