import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxRatsComponent } from './tax-rats.component';

const routes: Routes = [{ path: '', component: TaxRatsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRatsRoutingModule { }
