import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuotationsComponent } from './edit-quotations.component';

const routes: Routes = [{ path: '', component: EditQuotationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditQuotationsRoutingModule { }
