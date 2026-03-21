import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomFieldComponent } from './custom-field.component';

const routes: Routes = [{ path: '', component: CustomFieldComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomFieldRoutingModule { }
