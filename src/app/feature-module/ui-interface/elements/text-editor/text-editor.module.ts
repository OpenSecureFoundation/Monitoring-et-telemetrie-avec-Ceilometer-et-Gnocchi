import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextEditorRoutingModule } from './text-editor-routing.module';
import { TextEditorComponent } from './text-editor.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [TextEditorComponent],
  imports: [CommonModule, TextEditorRoutingModule, SharedModule],
})
export class TextEditorModule {}
