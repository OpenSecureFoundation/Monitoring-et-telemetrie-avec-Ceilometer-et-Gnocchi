import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstimatesComponent } from './estimates.component';

const routes: Routes = [
  {
    path: '',
    component: EstimatesComponent,
    children: [
     
      {
        path: 'add-estimate',
        loadChildren: () =>
          import('./add-estimates/add-estimates.module').then(
            (m) => m.AddEstimatesModule
          ),
      },
      {
        path: 'edit-estimate',
        loadChildren: () =>
          import('./edit-estimate/edit-estimate.module').then(
            (m) => m.EditEstimateModule
          ),
      },
      {
        path: 'view-estimate',
        loadChildren: () =>
          import('./view-estimate/view-estimate.module').then(
            (m) => m.ViewEstimateModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimatesRoutingModule {}
