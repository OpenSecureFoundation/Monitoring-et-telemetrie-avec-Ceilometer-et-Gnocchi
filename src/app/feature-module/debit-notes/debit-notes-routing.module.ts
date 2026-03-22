import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebitNotesComponent } from './debit-notes.component';

const routes: Routes = [{ path: '', component: DebitNotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebitNotesRoutingModule { }
