import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { AodhStateModel } from './state.aodh';
import { GetAlerts } from './actions.aodh';
import { AodhService } from '../../project-services/aodh.service';

@Injectable({ providedIn: 'root' })
export class AodhHandler {
  constructor(private aodhService: AodhService) {}

  getAllAlertsHandler(
    context: StateContext<AodhStateModel>,
    action: GetAlerts,
  ) {
    // TODO: Implement the logic to get all alerts
    const state = context.getState();
    this.aodhService.getAlerts().subscribe((res) => {
      if (res) {
        console.log('res: ', res);
        context.setState({
          ...state,
          alerts: res.alerts,
          stats: res.stats,
          projects: res.projectMap,
        });
      }
    });
  }
}
