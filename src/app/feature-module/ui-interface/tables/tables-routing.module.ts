import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables.component';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: 'data-table',
        loadChildren: () =>
          import('./data-tables/data-tables.module').then(
            (m) => m.DataTablesModule
          ),
      },
      {
        path: 'basic',
        loadChildren: () =>
          import('./basic-tables/basic-tables.module').then(
            (m) => m.BasicTablesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule {}
