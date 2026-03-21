import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCreditNotesComponent } from './edit-credit-notes.component';

const routes: Routes = [{ path: '', component: EditCreditNotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCreditNotesRoutingModule { }
