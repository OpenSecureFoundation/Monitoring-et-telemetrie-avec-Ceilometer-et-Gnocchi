import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteAccountRequestComponent } from './delete-account-request.component';

const routes: Routes = [{ path: '', component: DeleteAccountRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteAccountRequestRoutingModule { }
