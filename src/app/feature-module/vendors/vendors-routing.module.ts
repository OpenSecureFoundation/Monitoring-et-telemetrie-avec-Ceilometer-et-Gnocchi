import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors.component';

const routes: Routes = [
  {
    path: '',
    component: VendorsComponent,
    children: [
      {
        path: 'ledger',
        loadChildren: () =>
          import('./ledger/ledger.module').then((m) => m.LedgerModule),
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./list/list.module').then((m) => m.ListModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
