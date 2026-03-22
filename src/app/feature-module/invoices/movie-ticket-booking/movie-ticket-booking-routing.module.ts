import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieTicketBookingComponent } from './movie-ticket-booking.component';

const routes: Routes = [{ path: '', component: MovieTicketBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieTicketBookingRoutingModule { }
