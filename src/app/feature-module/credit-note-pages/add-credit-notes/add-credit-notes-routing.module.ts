import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCreditNotesComponent } from './add-credit-notes.component';

const routes: Routes = [{ path: '', component: AddCreditNotesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCreditNotesRoutingModule { }
