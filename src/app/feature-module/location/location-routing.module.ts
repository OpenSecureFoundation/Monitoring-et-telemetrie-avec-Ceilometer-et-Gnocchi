import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [
   { path: '', component: LocationComponent,children:[
    { path: 'countries', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesModule) }, 
    { path: 'states', loadChildren: () => import('./states/states.module').then(m => m.StatesModule) }, 
    { path: 'cities', loadChildren: () => import('./cities/cities.module').then(m => m.CitiesModule) },
   ] 
  },
   
   
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
