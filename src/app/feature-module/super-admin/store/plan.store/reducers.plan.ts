import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { PlanStateModel } from './state.plan';
import {
  CreatePlan,
  GetPlan,
  DeletePlan,
  ChangePlanStatus,
  UpdatePlan,
  GetPlans,
  GetAvailableMetrics,
  AddMetricPrice,
} from './actions.plan';
import { PlanService } from '../../project-services/plan.service';
import { tap, catchError, throwError } from 'rxjs';
declare var bootstrap: any;
@Injectable({ providedIn: 'root' })
export class PlanReducers {
  submitted: boolean = false;
  constructor(private planService: PlanService) {}

  // ── Helper : recalcule les stats depuis la liste des plans ──────────────
  private computeStats(plans: any[]): any {
    return {
      totalPlans: plans.length,
      activePlans: plans.filter((p) => p.status === 'active').length,
      inactivePlans: plans.filter((p) => p.status === 'inactive').length,
      archivedPlans: plans.filter((p) => p.status === 'archived').length,
    };
  }

  createPlan(ctx: StateContext<PlanStateModel>, action: CreatePlan) {
    ctx.patchState({ submitted: true });

    return this.planService.createPlan(action.payload).pipe(
      tap((response) => {
        const state = ctx.getState();
        const updatedPlans = [...state.plans, response.data];
        ctx.patchState({
          plans: updatedPlans,
          // ✅ Stats recalculées après création
          stats: this.computeStats(updatedPlans),
          submitted: false,
        });
      }),
      catchError((error) => {
        ctx.patchState({ submitted: false });
        return throwError(() => error);
      }),
    );
  }

  getPlans(context: StateContext<PlanStateModel>) {
    this.planService.getPlans().subscribe({
      next: (response) => {
        context.patchState({
          plans: response.data,
          // Les stats viennent du backend ici, on les garde telles quelles
          stats: response.stats,
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des plans:', error);
      },
    });
  }

  getPlanById(context: StateContext<PlanStateModel>, action: GetPlan) {
    this.planService.getPlan(action.id).subscribe({
      next: (response) => {
        console.log('response plan loaded: ', response);
        context.patchState({
          detailPlan: response.data,
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du plan:', error);
      },
    });
  }

  deletePlan(context: StateContext<PlanStateModel>, action: DeletePlan) {
    const state = context.getState();
    this.planService.deletePlan(action.id).subscribe({
      next: () => {
        // ⚠️ Correction du filtre : _id au lieu de id (cohérent avec changePlanStatus)
        const updatedPlans = state.plans.filter(
          (plan) => plan._id !== action.id,
        );
        context.patchState({
          plans: updatedPlans,
          // ✅ Stats recalculées après suppression
          stats: this.computeStats(updatedPlans),
        });
      },
      error: (error) => {
        console.error('Erreur lors de la suppression du plan:', error);
      },
    });
  }

  changePlanStatus(
    context: StateContext<PlanStateModel>,
    action: ChangePlanStatus,
  ) {
    const state = context.getState();

    this.planService.changePlanStatus(action.id, action.active).subscribe({
      next: () => {
        const updatedPlans = state.plans.map((plan) => {
          if (plan._id === action.id) {
            return { ...plan, status: action.active ? 'active' : 'inactive' };
          } else if (action.active === true) {
            return { ...plan, status: 'inactive' };
          }
          return plan;
        });

        context.patchState({
          plans: updatedPlans,
          // ✅ Stats recalculées après changement de statut
          stats: this.computeStats(updatedPlans),
        });
      },
      error: (error) => {
        console.error('Erreur lors du changement de statut:', error);
      },
    });
  }

  updatePlan(context: StateContext<PlanStateModel>, action: UpdatePlan) {
    const state = context.getState();
    this.planService.updatePlan(action.planId, action.payload).subscribe({
      next: (response) => {
        const updatedPlans = state.plans.map((plan) =>
          plan._id === action.planId ? response.data : plan,
        );
        context.patchState({
          plans: updatedPlans,
          // ✅ Stats recalculées après mise à jour
          stats: this.computeStats(updatedPlans),
        });
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du plan:', error);
      },
    });
  }

  getAvailableMetrics(
    context: StateContext<PlanStateModel>,
    action: GetAvailableMetrics,
  ) {
    context.patchState({ submitted: true });
    this.planService
      .getAvailableMetrics(action.id, { skipSpinner: true })
      .subscribe({
        next: (response) => {
          const availableMetrics = [...response.data];
          context.patchState({
            availableMetrics: availableMetrics,
            submitted: false,
          });
        },
        error: (error) => {
          context.patchState({ submitted: false });
          console.error(
            'Erreur lors de la récupération des metrics disponibles:',
            error,
          );
        },
      });
  }

  addMetricPrice(
    context: StateContext<PlanStateModel>,
    action: AddMetricPrice,
  ) {
    context.patchState({ submitted: true });

    this.planService
      .addMetricPrice(action.id, action.payload, { skipSpinner: false })
      .subscribe({
        next: (response) => {
          const state = context.getState();

          // ✅ CORRECTION : on met à jour detailPlan.metrics dans le store
          // en ajoutant la nouvelle rate à la liste existante
          const currentMetrics = state.detailPlan?.metrics ?? [];
          context.patchState({
            submitted: false,
            detailPlan: {
              ...state.detailPlan,
              metrics: [...currentMetrics, response.data],
            },
          });
        },
        error: (error) => {
          context.patchState({ submitted: false });
          console.error("Erreur lors de l'ajout du prix de la metric:", error);
        },
      });
  }
}
