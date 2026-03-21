import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentBillingComponent } from './student-billing.component';

const routes: Routes = [{ path: '', component: StudentBillingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentBillingRoutingModule { }
