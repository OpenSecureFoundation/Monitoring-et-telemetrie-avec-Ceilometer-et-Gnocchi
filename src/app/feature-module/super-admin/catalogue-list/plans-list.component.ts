import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SpinnerService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';
import {
  GetPlans,
  ChangePlanStatus,
  DeletePlan,
} from '../store/plan.store/actions.plan';
import { Observable } from 'rxjs';
import { PlanSelector } from '../store/plan.store/selector.plan';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrls: ['./plans-list.component.scss'],
  standalone: false,
})
export class PlansListComponent implements OnInit {
  allPlans: any[] = [];
  isLoading = false;
  stats: any = {};

  currentFilter: 'all' | 'active' | 'inactive' | 'archived' = 'all';
  filteredPlans: any[] = [];
  selectedPlan: any | null = null;
  plans$!: Observable<any>;
  stats$!: Observable<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public spinnserService: SpinnerService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetPlans());

    // ✅ Chaque fois que le store émet (après toute action), on re-filtre
    this.plans$ = this.store.select(PlanSelector.selectPlans);
    this.plans$.subscribe((plans) => {
      this.allPlans = plans ?? [];
      this.applyFilter();
    });

    // ✅ Les stats viennent UNIQUEMENT du store — plus de recalcul local
    this.stats$ = this.store.select(PlanSelector.getStats);
    this.stats$.subscribe((stats) => {
      this.stats = stats ?? {};
    });
  }

  // ── Filtre ─────────────────────────────────────────────────
  filterPlans(filter: 'all' | 'active' | 'inactive' | 'archived'): void {
    this.currentFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    this.filteredPlans =
      this.currentFilter === 'all'
        ? [...this.allPlans]
        : this.allPlans.filter((p) => p.status === this.currentFilter);
  }

  // ── Actions ────────────────────────────────────────────────

  onAddPlan(): void {
    console.log('[MOCK] Naviguer vers le formulaire de création');
  }

  onViewPlan(plan: any): void {
    this.router.navigateByUrl(`${routes.planDetail}/${plan._id}`);
  }

  onDeletePlan(plan: any): void {
    this.selectedPlan = plan;
  }

  confirmDelete(): void {
    if (!this.selectedPlan) return;
    // ✅ Le store met à jour allPlans → plans$.subscribe → applyFilter()
    //    → stats$.subscribe recalcule les stats automatiquement
    this.store.dispatch(new DeletePlan(this.selectedPlan._id));
    this.selectedPlan = null;
  }

  onToggleStatus(plan: any): void {
    const active = plan.status !== 'active';
    // ✅ Idem : le store propage tout, plus besoin de recalcStats()
    this.store.dispatch(new ChangePlanStatus(plan._id, active));
  }

  // ── Helpers ────────────────────────────────────────────────

  tierIcon(tier: string): string {
    const icons: Record<string, string> = {
      bronze: 'fa-award',
      silver: 'fa-medal',
      gold: 'fa-star',
      enterprise: 'fa-building',
    };
    return icons[tier] ?? 'fa-cube';
  }

  onPlanCreated(plan: any): void {
    // ✅ Si votre action de création patche déjà le state NGXS, rien à faire.
    // Sinon, forcer un rechargement : this.store.dispatch(new GetPlans());
  }
}
