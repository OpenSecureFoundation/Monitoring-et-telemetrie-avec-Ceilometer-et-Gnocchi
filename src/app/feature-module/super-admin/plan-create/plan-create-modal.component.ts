import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { PlanService } from '../project-services/plan.service';
import { CreatePlan } from '../store/plan.store/actions.plan';
import { ChangeDetectorRef } from '@angular/core';
import { PlanState, PlanStateModel } from '../store/plan.store/state.plan';
import { Observable } from 'rxjs';
import { PlanReducers } from '../store/plan.store/reducers.plan';
import { PlanSelector } from '../store/plan.store/selector.plan';

declare var bootstrap: any; // si vous fermez la modale programmatiquement

// ── Interfaces locales (à déplacer dans models/plan.model.ts) ─
export interface CurrencyOption {
  value: 'XAF' | 'EUR' | 'USD';
  symbol: string;
}

// Payload envoyé au parent / service — reflète exactement le schéma Mongoose
// export interface CreatePlanPayload {
//   name: string;
//   description: string;
//   version: number;
//   billingCycle: string;
//   currency: string;
//   basePrice: number;
// }

@Component({
  selector: 'app-plan-create-modal',
  templateUrl: './plan-create-modal.component.html',
  styleUrls: ['./plan-create-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PlanCreateModalComponent implements OnInit {
  // ZONE À REMPLACER — Émettre le plan créé vers le composant parent
  // Le parent s'abonne : (planCreated)="onPlanCreated($event)"
  @Output() planCreated = new EventEmitter<any>();
  submitting$ = this.store.select(PlanSelector.submitting);

  // ── État du formulaire ─────────────────────────────────────
  planForm!: FormGroup;
  currentStep: 1 | 2 = 1;
  // Remplace la propriété locale isSubmitting
  isSubmitting: boolean = false;

  // ── Options statiques ──────────────────────────────────────
  readonly currencyOptions: CurrencyOption[] = [
    { value: 'XAF', symbol: 'Fr' },
    { value: 'EUR', symbol: '€' },
    { value: 'USD', symbol: '$' },
  ];

  readonly cycleLabels: Record<string, string> = {
    hourly: 'Horaire',
    daily: 'Journalier',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    yearly: 'Annuel',
  };

  constructor(
    private fb: FormBuilder,
    private store: Store,
    public planReducers: PlanReducers,
    private planService: PlanService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  // ── Construction du FormGroup ──────────────────────────────
  private buildForm(): void {
    this.planForm = this.fb.group({
      // ── Step 1 ──
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80),
        ],
      ],
      description: ['', [Validators.maxLength(200)]],
      version: [
        1,
        [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)],
      ],

      // ── Step 2 ──
      billingCycle: ['monthly', [Validators.required]],
      currency: ['XAF', [Validators.required]],
      basePrice: [0, [Validators.required, Validators.min(0)]],
    });
  }

  // ── Navigation entre étapes ────────────────────────────────
  goToStep2(): void {
    this.markStep1AsTouched();
    if (this.isStep1Invalid()) return;
    this.currentStep = 2;
  }

  goToStep1(): void {
    this.currentStep = 1;
  }

  isStep1Invalid(): boolean {
    const controls = ['name', 'version'];
    return controls.some((key) => this.planForm.get(key)?.invalid);
  }

  private markStep1AsTouched(): void {
    ['name', 'description', 'version'].forEach((key) => {
      this.planForm.get(key)?.markAsTouched();
    });
  }

  // ── Sélecteur devise ──────────────────────────────────────
  selectCurrency(value: string): void {
    this.planForm.get('currency')?.setValue(value);
  }

  // ── Validation helpers (template) ─────────────────────────
  isFieldInvalid(field: string): boolean {
    const ctrl = this.planForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  getFieldError(field: string): string {
    const ctrl: AbstractControl | null = this.planForm.get(field);
    if (!ctrl || !ctrl.errors) return '';

    if (ctrl.errors['required']) return 'Ce champ est obligatoire.';
    if (ctrl.errors['minlength'])
      return `Minimum ${ctrl.errors['minlength'].requiredLength} caractères.`;
    if (ctrl.errors['maxlength'])
      return `Maximum ${ctrl.errors['maxlength'].requiredLength} caractères.`;
    if (ctrl.errors['min'])
      return `La valeur minimale est ${ctrl.errors['min'].min}.`;
    if (ctrl.errors['pattern'])
      return 'Veuillez entrer un nombre entier valide.';

    return 'Valeur invalide.';
  }

  // ── Soumission ─────────────────────────────────────────────
  onSubmit(): void {
    if (this.planForm.invalid) {
      this.planForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(new CreatePlan(this.planForm.value)).subscribe({
      next: () => {
        // ← reset du formulaire
        this.onClose();
      },
      error: () => {},
    });
  }

  // ── Fermeture / reset ──────────────────────────────────────
  onClose(): void {
    this.planForm.reset({
      version: 1,
      billingCycle: 'monthly',
      currency: 'XAF',
      basePrice: 0,
    });
    this.currentStep = 1;
    // Fermeture de la modale Bootstrap
    const modalEl = document.getElementById('create_plan_modal');
    if (modalEl) bootstrap.Modal.getInstance(modalEl)?.hide();
  }
}
