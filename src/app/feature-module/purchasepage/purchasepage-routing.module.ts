import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasepageComponent } from './purchasepage.component';

const routes: Routes = [
  { path: '', component: PurchasepageComponent ,children:[ {
    path: 'purchases',
    loadChildren: () =>
      import('./purchases/purchases.module').then((m) => m.PurchasesModule),
  },
  {
    path: 'edit-purchases',
    loadChildren: () =>
      import('./edit-purchases/edit-purchases.module').then(
        (m) => m.EditPurchasesModule
      ),
  },
  {
    path: 'add-purchases',
    loadChildren: () =>
      import('./add-purchases/add-purchases.module').then(
        (m) => m.AddPurchasesModule
      ),
  },
  {
    path: 'purchases-details',
    loadChildren: () =>
      import('./purchases-details/purchases-details.module').then(
        (m) => m.PurchasesDetailsModule
      ),
  },
  { path: 'add-purchase-return', loadChildren: () => import('./add-purchase-return/add-purchase-return.module').then(m => m.AddPurchaseReturnModule) },
  { path: 'add-purchases-order', loadChildren: () => import('./add-purchases-order/add-purchases-order.module').then(m => m.AddPurchasesOrderModule) },
  { path: 'edit-purchase-return', loadChildren: () => import('./edit-purchase-return/edit-purchase-return.module').then(m => m.EditPurchaseReturnModule) },

  ]},
  
  
 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchasepageRoutingModule {}
