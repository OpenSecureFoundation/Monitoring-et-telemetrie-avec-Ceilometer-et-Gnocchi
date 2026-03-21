import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickyNoteComponent } from './sticky-note.component';

const routes: Routes = [{ path: '', component: StickyNoteComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StickyNoteRoutingModule { }
