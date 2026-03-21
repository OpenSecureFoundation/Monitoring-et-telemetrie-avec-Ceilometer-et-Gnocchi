import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StickyNoteRoutingModule } from './sticky-note-routing.module';
import { StickyNoteComponent } from './sticky-note.component';


@NgModule({
  declarations: [
    StickyNoteComponent
  ],
  imports: [
    CommonModule,
    StickyNoteRoutingModule
  ]
})
export class StickyNoteModule { }
