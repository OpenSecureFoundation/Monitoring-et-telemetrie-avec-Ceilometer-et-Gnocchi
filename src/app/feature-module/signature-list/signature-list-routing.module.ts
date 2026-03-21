import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignatureListComponent } from './signature-list.component';

const routes: Routes = [{ path: '', component: SignatureListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignatureListRoutingModule { }
