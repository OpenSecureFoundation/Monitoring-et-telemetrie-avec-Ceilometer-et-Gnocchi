import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditNotePagesComponent } from './credit-note-pages.component';

const routes: Routes = [
  { path: '', component: CreditNotePagesComponent ,children:[
    {
      path: 'credit-notes',
      loadChildren: () =>
        import('./credit-notes/credit-notes.module').then(
          (m) => m.CreditNotesModule
        ),
    },
    {
      path: 'credit-notes-details',
      loadChildren: () =>
        import('./credit-notes-details/credit-notes-details.module').then(
          (m) => m.CreditNotesDetailsModule
        ),
    },
    {
      path: 'edit-credit-notes',
      loadChildren: () =>
        import('./edit-credit-notes/edit-credit-notes.module').then(
          (m) => m.EditCreditNotesModule
        ),
    },
    {
      path: 'add-credit-notes',
      loadChildren: () =>
        import('./add-credit-notes/add-credit-notes.module').then(
          (m) => m.AddCreditNotesModule
        ),
    },
  ] },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditNotePagesRoutingModule {}
