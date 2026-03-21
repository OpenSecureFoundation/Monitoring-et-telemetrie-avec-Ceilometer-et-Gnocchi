import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerdetailspageComponent } from './customerdetailspage.component';

const routes: Routes = [
  { path: '', component: CustomerdetailspageComponent,children:[
    
    {
      path: 'customer-details',
      loadChildren: () =>
        import('./customer-details/customer-details.module').then(
          (m) => m.CustomerDetailsModule
        ),
    },

  ]
 },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerdetailspageRoutingModule {}
