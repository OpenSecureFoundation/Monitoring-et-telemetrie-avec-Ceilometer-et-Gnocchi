import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditNotesDetailsComponent } from './credit-notes-details.component';

const routes: Routes = [{ path: '', component: CreditNotesDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditNotesDetailsRoutingModule { }
