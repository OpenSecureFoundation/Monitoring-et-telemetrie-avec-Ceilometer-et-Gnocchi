import { Injectable } from '@angular/core';
import { ResourceService } from '../../project-services/resource.service';
import { StateContext } from '@ngxs/store';
import { ResourceStateModel } from './state.resource';
import {
  GetResource,
  GetMetric,
  GetAlarm,
  GetPort,
  GetTrafic,
  GetInstanceAlarms,
  CreateAlarm,
} from './actions.resource';
import { tap, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResourceHandler {
  constructor(private resourceService: ResourceService) {}

  getResource(context: StateContext<ResourceStateModel>, action: GetResource) {
    const ctx = context.getState();
    console.log('hello ronice');
    console.log(
      'action payload: ',
      action.projectId,
      action.resourceId,
      action.resourceType,
    );
    this.resourceService
      .getResource(action.projectId, action.resourceId, action.resourceType)
      .subscribe((response) => {
        if (response) {
          console.log('response in reducer: ', response);
          context.setState({
            ...ctx,
            instance: response.overview.instance,
            miniMetric: response.overview.miniMetrics,
          });
        } else {
          console.log('response is not define');
        }
      });
  }

  getMetric(context: StateContext<ResourceStateModel>, payload: GetMetric) {
    const ctx = context.getState();
    this.resourceService
      .getMetric(payload.projectId, payload.instanceId, payload.range)
      .subscribe((response) => {
        if (response) {
          console.log('response in reducer: ', response);
          context.setState({
            ...ctx,
            timeSerie: response.timeSeries,
          });
        }
      });
  }

  getAlarms(context: StateContext<ResourceStateModel>, payload: GetAlarm) {
    const ctx = context.getState();
    this.resourceService
      .getAlarms(payload.projectId, payload.resourceId)
      .subscribe((res) => {
        if (res) {
          console.log('res in handler: ', res);
          context.setState({
            ...ctx,
            alarms: res.alarms,
          });
        }
      });
  }

  getPorts(context: StateContext<ResourceStateModel>, payload: GetPort) {
    const ctx = context.getState();
    this.resourceService
      .getPorts(payload.projectId, payload.instanceId)
      .subscribe((response) => {
        if (response) {
          console.log('response in handler: ', response);
          context.setState({
            ...ctx,
            ports: response.ports,
          });
        }
      });
  }

  getTrafic(context: StateContext<ResourceStateModel>, payload: GetTrafic) {
    const ctx = context.getState();
    this.resourceService
      .getTrafic(payload.projectId, payload.instanceId, payload.interval)
      .subscribe((response) => {
        if (response) {
          console.log('response in handler: ', response);
          context.setState({
            ...ctx,
            portTimeSerie: response.trafic,
          });
        }
      });
  }

  getInstanceAlarms(
    context: StateContext<ResourceStateModel>,
    action: GetInstanceAlarms,
  ) {
    const ctx = context.getState();
    this.resourceService
      .getInstanceAlarms(action.projectId, action.instanceId)
      .subscribe({
        next: (response) => {
          console.log('reduce response:', response.data);
          context.patchState({
            alarms: response.data,
          });
        },
        error: (error) => {
          console.error(
            "Erreur lors de la récupération des alarmes de l'instance:",
            error,
          );
        },
      });
  }

  createAlarm(ctx: StateContext<ResourceStateModel>, action: CreateAlarm) {
    ctx.patchState({ loading: true });
    return this.resourceService
      .createAlarm(action.projectId, action.payload)
      .pipe(
        tap((response) => {
          console.log('reduce response create alarm:', response.data);
          const state = ctx.getState();
          const updatedAlarms = [...state.alarms, response.alarm];
          ctx.patchState({
            alarms: updatedAlarms,
            loading: false,
          });
        }),
        catchError((error) => {
          ctx.patchState({ loading: false });
          return throwError(() => error);
        }),
      );
  }
}
