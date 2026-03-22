import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoneyexchangeComponent } from './moneyexchange.component';

const routes: Routes = [{ path: '', component: MoneyexchangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyexchangeRoutingModule { }
