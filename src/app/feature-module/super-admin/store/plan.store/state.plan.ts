import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { PlanReducers } from './reducers.plan';
import {
  ChangePlanStatus,
  CreatePlan,
  DeletePlan,
  GetAvailableMetrics,
  GetPlan,
  GetPlans,
  UpdatePlan,
  AddMetricPrice,
} from './actions.plan';
export interface PlanStateModel {
  detailPlan: {
    plan: any;
    metrics: any[];
  };
  plans: any[];
  stats: any;
  availableMetrics: any[];
  billableMetrics: any[];
  rate: any;
  submitted: boolean;
}

@State<PlanStateModel>({
  name: 'plan',
  defaults: {
    // ✅ CORRECTION : detailPlan initialisé avec un objet valide
    // Les selectors child reçoivent { plan: null, metrics: [] }
    // au lieu de null → plus de crash "Cannot read properties of null"
    detailPlan: {
      plan: null,
      metrics: [],
    },
    plans: [] as any[],
    stats: {} as any,
    availableMetrics: [] as any[],
    billableMetrics: [] as any[],
    rate: {} as any,
    submitted: false,
  },
})
@Injectable({
  providedIn: 'root',
})
export class PlanState {
  constructor(private planReducers: PlanReducers) {}

  @Action(CreatePlan)
  createPlan(context: StateContext<PlanStateModel>, action: CreatePlan) {
    return this.planReducers.createPlan(context, action);
  }

  @Action(GetPlans)
  getAllPlans(context: StateContext<PlanStateModel>) {
    this.planReducers.getPlans(context);
  }

  @Action(GetPlan)
  getPlan(context: StateContext<PlanStateModel>, action: GetPlan) {
    this.planReducers.getPlanById(context, action);
  }

  @Action(DeletePlan)
  deletePlan(context: StateContext<PlanStateModel>, action: DeletePlan) {
    this.planReducers.deletePlan(context, action);
  }

  @Action(ChangePlanStatus)
  changePlanStatus(
    context: StateContext<PlanStateModel>,
    action: ChangePlanStatus,
  ) {
    this.planReducers.changePlanStatus(context, action);
  }

  @Action(UpdatePlan)
  updatePlan(context: StateContext<PlanStateModel>, action: UpdatePlan) {
    this.planReducers.updatePlan(context, action);
  }

  @Action(GetAvailableMetrics)
  getAvailableMetrics(
    context: StateContext<PlanStateModel>,
    action: GetAvailableMetrics,
  ) {
    this.planReducers.getAvailableMetrics(context, action);
  }

  @Action(AddMetricPrice)
  addMetricPrice(
    context: StateContext<PlanStateModel>,
    action: AddMetricPrice,
  ) {
    console.log(
      'addMetricPrice action and context',
      action,
      context.getState(),
    );
    this.planReducers.addMetricPrice(context, action);
  }
}
