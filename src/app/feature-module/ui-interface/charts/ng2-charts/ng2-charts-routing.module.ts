import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Ng2ChartsComponent } from './ng2-charts.component';

const routes: Routes = [
  {
    path: '',
    component: Ng2ChartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ng2ChartsRoutingModule {}
