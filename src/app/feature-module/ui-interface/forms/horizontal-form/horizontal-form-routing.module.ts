import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorizontalComponent } from '../../elements/horizontal/horizontal.component';

const routes: Routes = [
  {
    path: '',
    component: HorizontalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HorizontalFormRoutingModule {}
