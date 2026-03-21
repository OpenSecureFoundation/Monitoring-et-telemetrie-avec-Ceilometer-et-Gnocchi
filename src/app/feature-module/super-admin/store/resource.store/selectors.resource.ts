import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { ResourceState, ResourceStateModel } from './state.resource';

@Injectable({ providedIn: 'root' })
export class ResourceSelector {
  constructor() {}

  @Selector([ResourceState])
  static getResource(state: ResourceStateModel) {
    return state.instance;
  }

  @Selector([ResourceState])
  static getMiniMetric(state: ResourceStateModel) {
    return state.miniMetric;
  }

  @Selector([ResourceState])
  static getTimeSerie(state: ResourceStateModel) {
    return state.timeSerie;
  }

  @Selector([ResourceState])
  static getAlarm(state: ResourceStateModel) {
    return state.alarms;
  }

  @Selector([ResourceState])
  static getPort(state: ResourceStateModel) {
    return state.ports;
  }

  @Selector([ResourceState])
  static getPortFlux(state: ResourceStateModel) {
    return state.portTimeSerie;
  }

  @Selector([ResourceState])
  static getInstanceAlarms(state: ResourceStateModel) {
    return state.alarms;
  }

  @Selector([ResourceState])
  static submitting(state: ResourceStateModel): boolean {
    return state.submitted;
  }

  @Selector([ResourceState])
  static isAlarmsLoading(state: ResourceStateModel): boolean {
    return state.loading;
  }
}
