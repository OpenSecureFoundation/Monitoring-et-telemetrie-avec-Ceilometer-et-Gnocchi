import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesComponent } from './expenses.component';

const routes: Routes = [
  {
    path: '',
    component: ExpensesComponent,
    children: [
      {
        path: 'expenses-list',
        loadChildren: () =>
          import('./expenses-list/expenses-list.module').then(
            (m) => m.ExpensesListModule
          ),
      },
     
      
    ],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesRoutingModule {}
