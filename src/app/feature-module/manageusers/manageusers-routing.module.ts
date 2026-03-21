import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageusersComponent } from './manageusers.component';

const routes: Routes = [
  {
    path: '',
    component: ManageusersComponent,
    children: [
      
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageusersRoutingModule {}
