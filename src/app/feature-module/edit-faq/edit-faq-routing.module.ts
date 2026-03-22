import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFaqComponent } from './edit-faq.component';

const routes: Routes = [{ path: '', component: EditFaqComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditFaqRoutingModule { }
