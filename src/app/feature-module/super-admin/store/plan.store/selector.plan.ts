import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { PlanState, PlanStateModel } from './state.plan';

@Injectable()
export class PlanSelector {
  constructor() {}

  @Selector([PlanState])
  static selectPlans(state: PlanStateModel) {
    return state.plans;
  }

  // ✅ Selector racine — retourne detailPlan
  // Avec le defaults corrigé, ne sera plus jamais null
  @Selector([PlanState])
  static selectDetailPlan(state: PlanStateModel) {
    return state.detailPlan;
  }

  // ✅ Selector child — guard ?. pour éviter tout crash résiduel
  @Selector([PlanSelector.selectDetailPlan])
  static selectPlan(detailPlan: any) {
    return detailPlan?.plan ?? null;
  }

  // ✅ Selector child — retourne [] si metrics absent
  @Selector([PlanSelector.selectDetailPlan])
  static selectMetrics(detailPlan: any) {
    return detailPlan?.metrics ?? [];
  }

  @Selector([PlanState])
  static submitting(state: PlanStateModel): boolean {
    return state.submitted;
  }

  @Selector([PlanState])
  static getStats(state: PlanStateModel) {
    return state.stats;
  }

  @Selector([PlanState])
  static getAvailableMetrics(state: PlanStateModel) {
    return state.availableMetrics ?? [];
  }
}
