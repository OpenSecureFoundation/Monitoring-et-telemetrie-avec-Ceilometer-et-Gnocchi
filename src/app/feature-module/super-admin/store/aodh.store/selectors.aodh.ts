import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { AodhState } from './state.aodh';
import { AodhStateModel } from './state.aodh';

@Injectable({ providedIn: 'root' })
export class AodhSelector {
  constructor() {}

  @Selector([AodhState])
  static getAlerts(state: AodhStateModel) {
    return state.alerts;
  }

  @Selector([AodhState])
  static getStats(state: AodhStateModel) {
    return state.stats;
  }

  @Selector([AodhState])
  static getProjects(state: AodhStateModel) {
    return state.projects;
  }
}
