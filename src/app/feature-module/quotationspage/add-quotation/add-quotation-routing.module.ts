import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuotationComponent } from './add-quotation.component';

const routes: Routes = [{ path: '', component: AddQuotationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddQuotationRoutingModule { }
