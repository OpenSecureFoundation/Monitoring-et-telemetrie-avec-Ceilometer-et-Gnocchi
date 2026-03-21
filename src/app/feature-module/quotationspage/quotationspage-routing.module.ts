import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationspageComponent } from './quotationspage.component';

const routes: Routes = [
  { path: '', component: QuotationspageComponent ,children:[ {
    path: 'quotations',
    loadChildren: () =>
      import('./quotations/quotations.module').then((m) => m.QuotationsModule),
  },
  {
    path: 'add-quotation',
    loadChildren: () =>
      import('./add-quotation/add-quotation.module').then(
        (m) => m.AddQuotationModule
      ),
  },
  {
    path: 'edit-quotations',
    loadChildren: () =>
      import('./edit-quotations/edit-quotations.module').then(
        (m) => m.EditQuotationsModule
      ),
  },

  ]
},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuotationspageRoutingModule {}
