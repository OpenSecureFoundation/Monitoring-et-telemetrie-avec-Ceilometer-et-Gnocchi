import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketPagesComponent } from './ticket-pages.component';

const routes: Routes = [
  {
    path: '',
    component: TicketPagesComponent,
    children: [
      {
        path: 'tickets',
        loadChildren: () =>
          import('./tickets/tickets.module').then((m) => m.TicketsModule),
      },
      {
        path: 'tickets-list',
        loadChildren: () =>
          import('./tickets-list/tickets-list.module').then(
            (m) => m.TicketsListModule
          ),
      },
      {
        path: 'tickets-kanban',
        loadChildren: () =>
          import('./tickets-kanban/tickets-kanban.module').then(
            (m) => m.TicketsKanbanModule
          ),
      },
      {
        path: 'ticket-details',
        loadChildren: () =>
          import('./ticket-details/ticket-details.module').then(
            (m) => m.TicketDetailsModule
          ),
      },
      {
        path: 'tickets-list-pending',
        loadChildren: () =>
          import('./tickets-list-pending/tickets-list-pending.module').then(
            (m) => m.TicketsListPendingModule
          ),
      },
      {
        path: 'tickets-list-overdue',
        loadChildren: () =>
          import('./tickets-list-overdue/tickets-list-overdue.module').then(
            (m) => m.TicketsListOverdueModule
          ),
      },
      {
        path: 'tickets-list-draft',
        loadChildren: () =>
          import('./tickets-list-draft/tickets-list-draft.module').then(
            (m) => m.TicketsListDraftModule
          ),
      },
      {
        path: 'tickets-list-recurring',
        loadChildren: () =>
          import('./tickets-list-recurring/tickets-list-recurring.module').then(
            (m) => m.TicketsListRecurringModule
          ),
      },
      {
        path: 'tickets-pending',
        loadChildren: () =>
          import('./tickets-pending/tickets-pending.module').then(
            (m) => m.TicketsPendingModule
          ),
      },
      {
        path: 'tickets-overdue',
        loadChildren: () =>
          import('./tickets-overdue/tickets-overdue.module').then(
            (m) => m.TicketsOverdueModule
          ),
      },
      {
        path: 'tickets-recurring',
        loadChildren: () =>
          import('./tickets-recurring/tickets-recurring.module').then(
            (m) => m.TicketsRecurringModule
          ),
      },
      {
        path: 'tickets-list-open',
        loadChildren: () =>
          import('./tickets-list-open/tickets-list-open.module').then(
            (m) => m.TicketsListOpenModule
          ),
      },
      {
        path: 'tickets-list-resolved',
        loadChildren: () =>
          import('./tickets-list-resolved/tickets-list-resolved.module').then(
            (m) => m.TicketsListResolvedModule
          ),
      },
      {
        path: 'tickets-list-closed',
        loadChildren: () =>
          import('./tickets-list-closed/tickets-list-closed.module').then(
            (m) => m.TicketsListClosedModule
          ),
      },
      {
        path: 'tickets-open',
        loadChildren: () =>
          import('./tickets-open/tickets-open.module').then(
            (m) => m.TicketsOpenModule
          ),
      },
      {
        path: 'tickets-resolved',
        loadChildren: () =>
          import('./tickets-resolved/tickets-resolved.module').then(
            (m) => m.TicketsResolvedModule
          ),
      },
      {
        path: 'tickets-closed',
        loadChildren: () =>
          import('./tickets-closed/tickets-closed.module').then(
            (m) => m.TicketsClosedModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketPagesRoutingModule {}
