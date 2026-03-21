import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import {
  GetResource,
  GetMetric,
  GetPort,
  GetTrafic,
  GetInstanceAlarms,
  CreateAlarm,
} from './actions.resource';
import { ResourceHandler } from './reducers.resource';

export interface ResourceStateModel {
  instance: any;
  miniMetric: any;
  timeSerie: any;
  alarms: any;
  ports: any;
  portTimeSerie: any;
  alarm: any;
  submitted: boolean;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
@State<ResourceStateModel>({
  name: 'resource',
  defaults: {
    instance: null,
    miniMetric: null,
    timeSerie: null,
    alarms: null,
    ports: null,
    portTimeSerie: null,
    alarm: null,
    submitted: false,
    loading: false,
  },
})
export class ResourceState {
  constructor(private resourceHandler: ResourceHandler) {}

  @Action(GetResource)
  getResource(ctx: StateContext<ResourceStateModel>, action: GetResource) {
    console.log('Get resource action dispatched: ', action, ctx);
    this.resourceHandler.getResource(ctx, action);
  }

  @Action(GetMetric)
  getMetric(ctx: StateContext<ResourceStateModel>, action: GetMetric) {
    console.log('Get metric action dispatched: ', ctx, action);
    this.resourceHandler.getMetric(ctx, action);
  }

  @Action(GetPort)
  getInstancePorts(ctx: StateContext<ResourceStateModel>, action: GetPort) {
    console.log('Get port action dispatched: ', ctx, action);
    this.resourceHandler.getPorts(ctx, action);
  }

  @Action(GetTrafic)
  getTrafic(ctx: StateContext<ResourceStateModel>, action: GetTrafic) {
    console.log('Get trafic action dispatched: ', ctx, action);
    this.resourceHandler.getTrafic(ctx, action);
  }

  @Action(GetInstanceAlarms)
  getInstanceAlarms(
    context: StateContext<ResourceStateModel>,
    action: GetInstanceAlarms,
  ) {
    console.log('Get instance alamrs action dispatched: ', context, action);
    this.resourceHandler.getInstanceAlarms(context, action);
  }

  @Action(CreateAlarm)
  createAlarm(context: StateContext<ResourceStateModel>, action: CreateAlarm) {
    return this.resourceHandler.createAlarm(context, action);
  }
}
