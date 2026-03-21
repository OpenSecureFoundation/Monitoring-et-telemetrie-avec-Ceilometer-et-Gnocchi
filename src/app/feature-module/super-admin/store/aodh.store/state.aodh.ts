import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Alert } from '../../models/alert';
import { GetAlerts } from './actions.aodh';
import { AodhHandler } from './reducers.aodh';

// This is the state interface for the aodh state
export interface AodhStateModel {
  alerts: Alert[];
  stats: any;
  projects: any;
}

@Injectable({ providedIn: 'root' })
// this is decorator that binds the class to the state
@State<AodhStateModel>({
  name: 'aodh',
  defaults: {
    alerts: [] as Alert[],
    stats: {} as any,
    projects: null,
  },
})

// This is the state class for the aodh state
export class AodhState {
  constructor(private aodhHandler: AodhHandler) {}

  @Action(GetAlerts)
  getAllAlerts(ctx: StateContext<AodhStateModel>, action: GetAlerts) {
    // TODO: Implement the logic to get all alerts
    console.log('Get all alerts action dispatched: ', action, ctx);
    this.aodhHandler.getAllAlertsHandler(ctx, action);
  }
}
