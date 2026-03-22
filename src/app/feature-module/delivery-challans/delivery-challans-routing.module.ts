import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryChallansComponent } from './delivery-challans.component';

const routes: Routes = [
  {
    path: '',
    component: DeliveryChallansComponent,
    children: [
      {
        path: 'add-delivery-challans',
        loadChildren: () =>
          import('./add-delivery-challans/add-delivery-challans.module').then(
            (m) => m.AddDeliveryChallansModule
          ),
      },
      {
        path: 'edit-delivery-challans',
        loadChildren: () =>
          import('./edit-delivery-challans/edit-delivery-challans.module').then(
            (m) => m.EditDeliveryChallansModule
          ),
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
export class DeliveryChallansRoutingModule {}
