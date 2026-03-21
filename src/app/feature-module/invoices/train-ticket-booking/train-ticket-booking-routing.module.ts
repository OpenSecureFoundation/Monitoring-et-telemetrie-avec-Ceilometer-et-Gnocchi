import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainTicketBookingComponent } from './train-ticket-booking.component';

const routes: Routes = [{ path: '', component: TrainTicketBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainTicketBookingRoutingModule { }
