import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoffeeShopComponent } from './coffee-shop.component';

const routes: Routes = [{ path: '', component: CoffeeShopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoffeeShopRoutingModule { }
