import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    children: [
      {
        path: 'inventory-history',
        loadChildren: () =>
          import('./inventory-history/inventory-history.module').then(
            (m) => m.InventoryHistoryModule
          ),
      },
    ],
  },
  { path: 'all-inventory', loadChildren: () => import('./all-inventory/all-inventory.module').then(m => m.AllInventoryModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
