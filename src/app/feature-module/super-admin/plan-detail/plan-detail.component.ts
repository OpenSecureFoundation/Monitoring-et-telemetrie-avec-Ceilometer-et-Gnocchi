import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../project-services/plan.service';
import { Store } from '@ngxs/store';
import {
  AddMetricPrice,
  GetAvailableMetrics,
  GetPlan,
} from '../store/plan.store/actions.plan';
import { PlanSelector } from '../store/plan.store/selector.plan';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/core/core.index';
import { filter, take } from 'rxjs/operators';

// si vous fermez la modale programmatiquement
declare var bootstrap: any;

// ============================================================
//  INTERFACES — À centraliser dans models/plan.model.ts
// ============================================================
export interface Plan {
  _id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'archived';
  billingCycle: string;
  currency: string;
  basePrice: number;
  version: number;
  createdBy?: string;
  activatedAt?: Date;
  createdAt?: Date;
}

export interface PlanRate {
  _id: string;
  planId: string;
  metricKey: string;
  unit: string;
  price: number;
}

export interface BillingMetric {
  _id: string;
  metricKey: string;
  displayName: string;
  technicalUnit: string;
  billingUnit: string;
  billingMode: 'activation' | 'consumption';
  category: 'compute' | 'network' | 'storage' | string;
  isActive?: boolean;
}

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PlanDetailComponent implements OnInit {
  // ── Données ────────────────────────────────────────────────
  plan: Plan | null = null;
  mockRates: PlanRate[] = [];

  // ── État UI ────────────────────────────────────────────────
  // selectedRate: PlanRate | null = null;
  selectedRate!: any;
  isEditingRate = false;
  isSubmittingRate = false;

  // ── Métriques disponibles ──────────────────────────────────
  availableMetrics: BillingMetric[] = [];
  isLoadingMetrics = false;
  selectedMetric: BillingMetric | null = null;
  AllMetric: any[] = [];
  metrics$!: Observable<any[]>;
  plan$!: Observable<any>;

  // ── Propriété cachée — remplace le getter pour éviter le re-render loop ──
  metricsByCategory: { category: string; metrics: BillingMetric[] }[] = [];

  // ── Formulaire Rate ────────────────────────────────────────
  rateForm!: FormGroup;

  // ── Maps d'icônes ressources ───────────────────────────────
  private readonly iconMap: Record<string, string> = {
    cpu: 'fa-microchip',
    'memory.resident': 'fa-memory',
    'disk.device.read.bytes': 'fa-hdd',
    'disk.device.write.bytes': 'fa-hdd',
    'network.outgoing.bytes': 'fa-wifi',
    'network.incoming.bytes': 'fa-wifi',
    'ip.floating': 'fa-globe',
    volume: 'fa-database',
    snapshot: 'fa-camera',
    gpu: 'fa-bolt',
  };

  private readonly cycleLabels: Record<string, string> = {
    hourly: 'Horaire',
    daily: 'Journalier',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private planService: PlanService,
    private store: Store,
    public spinnerService: SpinnerService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.buildRateForm();
    this.loadPlan();
  }

  submitting$ = this.store.select(PlanSelector.submitting);

  // ── Chargement du plan ─────────────────────────────────────
  private loadPlan(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new GetPlan(id!));
    this.plan$ = this.store.select(PlanSelector.selectPlan);
    this.plan$.subscribe((plan) => {
      this.plan = plan;
    });
    this.metrics$ = this.store.select(PlanSelector.selectMetrics);
    this.metrics$.subscribe((metrics) => {
      this.AllMetric = metrics;
    });
  }

  // ── Chargement des métriques disponibles ───────────────────
  private loadAvailableMetrics(): void {
    this.availableMetrics = [];
    this.metricsByCategory = [];
    this.selectedMetric = null;

    this.store.dispatch(new GetAvailableMetrics(this.plan!._id));
    this.store
      .select(PlanSelector.getAvailableMetrics)
      .pipe(
        filter((m) => m && m.length > 0),
        take(1),
      )
      .subscribe((metrics) => {
        this.availableMetrics = metrics;
        this.buildMetricsByCategory();
        this.cdr.markForCheck();
      });
  }

  // ── Construction de metricsByCategory — appelée une seule fois ──
  private buildMetricsByCategory(): void {
    const groups: Record<string, BillingMetric[]> = {};
    for (const m of this.availableMetrics) {
      if (!groups[m.category]) groups[m.category] = [];
      groups[m.category].push(m);
    }
    this.metricsByCategory = Object.entries(groups).map(
      ([category, metrics]) => ({
        category,
        metrics,
      }),
    );
  }

  // ── Construction du FormGroup Rate ─────────────────────────
  private buildRateForm(): void {
    this.rateForm = this.fb.group({
      metricId: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
    });

    // Synchronisation automatique selectedMetric ↔ FormControl
    this.rateForm
      .get('metricId')!
      .valueChanges.subscribe((metricId: string) => {
        this.selectedMetric =
          this.availableMetrics.find((m) => m._id === metricId) ?? null;
      });
  }

  // ── Sélection d'une métrique dans le select ────────────────
  onMetricChange(metricId: string): void {
    this.selectedMetric =
      this.availableMetrics.find((m) => m._id === metricId) ?? null;
    console.log('selectedMetric:', this.selectedMetric);
  }

  // ── Helpers d'affichage ────────────────────────────────────
  categoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      compute: 'Compute',
      network: 'Network',
      storage: 'Storage',
    };
    return labels[cat] ?? cat;
  }

  categoryIcon(cat: string): string {
    const icons: Record<string, string> = {
      compute: 'fa-microchip',
      network: 'fa-wifi',
      storage: 'fa-hdd',
    };
    return icons[cat] ?? 'fa-cube';
  }

  billingModeLabel(mode: string): string {
    return mode === 'activation' ? 'Activation' : 'Consommation';
  }

  cycleLabel(cycle: string): string {
    return this.cycleLabels[cycle] ?? cycle;
  }

  resourceIcon(metricKey: string): string {
    return this.iconMap[metricKey] ?? 'fa-cube';
  }

  // ── Validation Rate ────────────────────────────────────────
  isRateFieldInvalid(field: string): boolean {
    const ctrl = this.rateForm.get(field);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched));
  }

  getRateFieldError(field: string): string {
    const ctrl: AbstractControl | null = this.rateForm.get(field);
    if (!ctrl?.errors) return '';
    if (ctrl.errors['required']) return 'Ce champ est obligatoire.';
    if (ctrl.errors['min'])
      return `La valeur minimale est ${ctrl.errors['min'].min}.`;
    return 'Valeur invalide.';
  }

  // ── Actions Plan ───────────────────────────────────────────
  onBack(): void {
    // ⚠️ ZONE À REMPLACER — this.router.navigate(['/billing/plans'])
    console.log('[MOCK] Retour à la liste');
  }

  onEdit(): void {
    // ⚠️ ZONE À REMPLACER — ouvrir la modale d'édition du plan
    // ou : this.router.navigate(['/billing/plans', this.plan!._id, 'edit'])
    console.log('[MOCK] Modifier le plan :', this.plan?._id);
  }

  // ── Actions Rate ───────────────────────────────────────────
  onAddRate(): void {
    this.isEditingRate = false;
    this.selectedRate = null;
    this.selectedMetric = null;
    this.rateForm.reset({ metricId: '', price: null });
    this.loadAvailableMetrics();
  }

  onEditRate(rate: PlanRate): void {
    this.isEditingRate = true;
    this.selectedRate = rate;
    this.selectedMetric = null;
    this.availableMetrics = [];
    this.metricsByCategory = [];
    this.rateForm.patchValue({ price: rate.price });
    this.rateForm.get('metricId')?.clearValidators();
    this.rateForm.get('metricId')?.updateValueAndValidity();
  }

  onCloseRateForm(): void {
    this.rateForm.reset();
    this.rateForm.get('metricId')?.setValidators([Validators.required]);
    this.rateForm.get('metricId')?.updateValueAndValidity();
    this.isEditingRate = false;
    this.isSubmittingRate = false;
    this.selectedRate = null;
    this.selectedMetric = null;
    this.availableMetrics = [];
    this.metricsByCategory = [];
  }

  onDeleteRate(rate: PlanRate): void {
    this.selectedRate = rate;
    // La modale Bootstrap s'ouvre via data-bs-toggle sur le bouton HTML
  }

  confirmDeleteRate(): void {
    if (!this.selectedRate) return;

    // ⚠️ ZONE À REMPLACER :
    // this.planRateService.delete(this.selectedRate._id).subscribe(() => {
    //   this.mockRates = this.mockRates.filter(r => r._id !== this.selectedRate!._id);
    //   this.toast.success('Ressource supprimée.');
    //   this.selectedRate = null;
    // });

    this.mockRates = this.mockRates.filter(
      (r) => r._id !== this.selectedRate!._id,
    );
    this.selectedRate = null;
  }

  onSubmitRate(): void {
    if (this.rateForm.invalid) {
      this.rateForm.markAllAsTouched();
      return;
    }
    this.isSubmittingRate = true;

    if (this.isEditingRate && this.selectedRate) {
      // ── Mode édition : seul le prix change ──
      const payload = { price: Number(this.rateForm.value.price) };
      console.log('price payload:', payload);

      // ⚠️ ZONE À REMPLACER :
      // this.planRateService.update(this.selectedRate._id, payload).subscribe(() => {
      //   this.refreshRates(); this.onCloseRateForm();
      // });

      setTimeout(() => {
        this.isSubmittingRate = false;
        const idx = this.mockRates.findIndex(
          (r) => r._id === this.selectedRate!._id,
        );
        if (idx !== -1) {
          this.mockRates[idx] = { ...this.mockRates[idx], ...payload };
          this.mockRates = [...this.mockRates];
        }
        this.onCloseRateForm();
      }, 800);
    } else {
      // ── Mode création : on utilise la métrique sélectionnée ──
      if (!this.selectedMetric) return;
      const payload = {
        planId: this.plan!._id,
        metricKey: this.selectedMetric.metricKey,
        metricId: this.selectedMetric._id,
        unit: this.selectedMetric.billingUnit,
        price: Number(this.rateForm.value.price),
      };
      console.log('payload:', payload);

      this.store.dispatch(
        new AddMetricPrice(payload.planId, {
          billableMetricId: payload.metricId,
          price: payload.price,
        }),
      );
      // Fermeture de la modale Bootstrap
      this.onClose();
    }
  }

  // ── Fermeture / reset ──────────────────────────────────────
  onClose(): void {
    this.rateForm.reset();
    // Fermeture de la modale Bootstrap
    const modalEl = document.getElementById('rate_form_modal');
    if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}
