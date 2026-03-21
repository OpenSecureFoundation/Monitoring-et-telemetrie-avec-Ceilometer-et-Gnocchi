import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAlarmModalComponent } from './add-alarm-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AddAlarmModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlarmRoutingModule {}
