import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateAlarm } from '../store/resource.store/actions.resource';

import { CommonModule } from '@angular/common';
import { Project } from '../models/project.model';
import { ActivatedRoute } from '@angular/router';
import { ResourceSelector } from '../store/resource.store/selectors.resource';
// ── Payload interface ────────────────────────────────────────────────────────
export interface AlarmPayload {
  name: string;
  description: string;
  type: string;
  severity: string;
  enabled: boolean;
  repeat_actions: boolean;
  gnocchi_resources_threshold_rule?: {
    metric: string;
    resource_type: string;
    resource_id: string;
    aggregation_method: string;
    comparison_operator: string;
    threshold: number;
    granularity: number;
    evaluation_periods: number;
  };
  alarm_actions: string[];
  ok_actions: string[];
  insufficient_data_actions: string[];
  time_constraints: [];
}

// ── Animations ───────────────────────────────────────────────────────────────
const modalAnim = trigger('modalAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.94) translateY(24px)' }),
    animate(
      '320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      style({ opacity: 1, transform: 'scale(1) translateY(0)' }),
    ),
  ]),
  transition(':leave', [
    animate(
      '200ms ease-in',
      style({ opacity: 0, transform: 'scale(0.96) translateY(12px)' }),
    ),
  ]),
]);

const stepAnim = trigger('stepAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(18px)' }),
    animate(
      '240ms ease-out',
      style({ opacity: 1, transform: 'translateX(0)' }),
    ),
  ]),
  transition(':leave', [
    animate(
      '160ms ease-in',
      style({ opacity: 0, transform: 'translateX(-18px)' }),
    ),
  ]),
]);

// ── Component ────────────────────────────────────────────────────────────────
@Component({
  selector: 'app-add-alarm-modal',
  templateUrl: './add-alarm-modal.component.html',
  styleUrls: ['./add-alarm-modal.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  animations: [modalAnim, stepAnim],
  standalone: true,
})
export class AddAlarmModalComponent implements OnInit, OnDestroy, OnChanges {
  /** Whether the modal is currently open */
  @Input() isOpen = false;
  /** Current instance ID — pre-fills the resource_id field */
  @Input() instanceId = '';
  projectId!: string;

  /** Emitted when the user cancels or closes */
  @Output() closed = new EventEmitter<void>();
  /** Emitted with the built payload when the form is submitted */
  @Output() alarmCreated = new EventEmitter<AlarmPayload>();
  submitting$ = this.store.select(ResourceSelector.submitting);

  // ── State ──────────────────────────────────────────────────────
  currentStep = 1;
  submitting = false;
  alarmForm!: FormGroup;

  // ── Operator labels for the preview ───────────────────────────
  private readonly operatorLabels: Record<string, string> = {
    gt: '>',
    gte: '≥',
    lt: '<',
    lte: '≤',
    eq: '=',
    ne: '≠',
  };

  // ── Metric units for the threshold input ──────────────────────
  private readonly metricUnits: Record<string, string> = {
    cpu: 'ns',
    'memory.usage': 'MB',
    'memory.resident': 'MB',

    'disk.device.read.requests': 'request',
    'disk.device.write.requests': 'request',

    // 'disk.read.bytes.rate': 'B/s',
    // 'disk.write.bytes.rate': 'B/s',
    // 'disk.read.requests.rate': 'req/s',
    // 'disk.write.requests.rate': 'req/s',

    'network.incoming.packets.drop': 'packet',
    'network.outgoing.packets.drop': 'packet',
    'network.outgoing.bytes': 'B',
    'network.incoming.bytes': 'B',
    'network.incoming.packets': 'packet',
    'network.outgoing.packets': 'packet',
    'ip.floating': 'ip',

    // 'network.incoming.bytes.rate': 'B/s',
    // 'network.outgoing.bytes.rate': 'B/s',
    // 'network.incoming.packets.rate': 'pkt/s',
    // 'network.outgoing.packets.rate': 'pkt/s',
    // 'network.incoming.packets.drop.rate': 'drop/s',
    // 'network.outgoing.packets.drop.rate': 'drop/s',
  };

  // ── Type labels ───────────────────────────────────────────────
  private readonly typeLabels: Record<string, string> = {
    gnocchi_resources_threshold: 'Gnocchi Resources Threshold',
    gnocchi_aggregation_by_metrics_threshold: 'Gnocchi Aggregation by Metrics',
    gnocchi_aggregation_by_resources_threshold:
      'Gnocchi Aggregation by Resources',
    composite: 'Composite Alarm',
    event: 'Event Alarm',
    prometheus: 'Prometheus Query',
    loadbalancer_member_health: 'Loadbalancer Member Health',
  };

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  // ── Lifecycle ─────────────────────────────────────────────────
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = params.get('projectId')!;
      //  this.instanceId = params.get('instanceId')!;
    });
    this.buildForm();
    document.addEventListener('keydown', this.onKeyDown);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen']) {
      if (changes['isOpen'].currentValue === true) {
        document.body.style.overflow = 'hidden'; // ← bloque le scroll parent
      } else {
        document.body.style.overflow = ''; // ← restaure au retour
      }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = ''; // ← sécurité si composant détruit
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // ── Form builder ──────────────────────────────────────────────
  private buildForm(): void {
    this.alarmForm = this.fb.group({
      // Step 1 — General
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: [''],
      type: ['gnocchi_resources_threshold', Validators.required],
      severity: ['critical', Validators.required],
      enabled: [true],
      repeat_actions: [false],

      // Step 2 — Threshold rule (gnocchi_resources_threshold)
      threshold_rule: this.fb.group({
        metric: ['cpu_util', Validators.required],
        resource_type: ['instance', Validators.required],
        resource_id: ['', Validators.required],
        aggregation_method: ['mean', Validators.required],
        comparison_operator: ['gt', Validators.required],
        threshold: [null, [Validators.required, Validators.min(0)]],
        granularity: [300, Validators.required],
        evaluation_periods: [
          3,
          [Validators.required, Validators.min(1), Validators.max(100)],
        ],
      }),

      // Step 3 — Actions
      alarm_actions: this.fb.array([this.fb.control('')]),
      ok_actions: this.fb.array([this.fb.control('')]),
      insufficient_data_actions: this.fb.array([this.fb.control('')]),
    });

    // Pre-fill resource_id with the current instance
    if (this.instanceId) {
      this.alarmForm
        .get('threshold_rule.resource_id')
        ?.setValue(this.instanceId);
    }
  }

  // ── FormArray accessors ───────────────────────────────────────
  get alarmActionsArray(): FormArray {
    return this.alarmForm.get('alarm_actions') as FormArray;
  }

  get okActionsArray(): FormArray {
    return this.alarmForm.get('ok_actions') as FormArray;
  }

  get insufficientDataActionsArray(): FormArray {
    return this.alarmForm.get('insufficient_data_actions') as FormArray;
  }

  addAction(
    arrayName: 'alarm_actions' | 'ok_actions' | 'insufficient_data_actions',
  ): void {
    (this.alarmForm.get(arrayName) as FormArray).push(this.fb.control(''));
  }

  removeAction(
    arrayName: 'alarm_actions' | 'ok_actions' | 'insufficient_data_actions',
    index: number,
  ): void {
    (this.alarmForm.get(arrayName) as FormArray).removeAt(index);
  }

  // ── Validation helpers ────────────────────────────────────────
  isFieldInvalid(field: string): boolean {
    const ctrl = this.alarmForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  isSubFieldInvalid(group: string, field: string): boolean {
    const ctrl = this.alarmForm.get(`${group}.${field}`);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  // ── Step navigation ───────────────────────────────────────────
  nextStep(): void {
    if (this.currentStep === 1) {
      this.markStep1Touched();
      if (!this.step1Valid()) return;
    }
    if (this.currentStep === 2) {
      this.markStep2Touched();
      if (!this.step2Valid()) return;
    }
    this.currentStep = Math.min(this.currentStep + 1, 3);
  }

  prevStep(): void {
    this.currentStep = Math.max(this.currentStep - 1, 1);
  }

  private step1Valid(): boolean {
    const fields = ['name', 'type', 'severity'];
    return fields.every((f) => this.alarmForm.get(f)?.valid);
  }

  private step2Valid(): boolean {
    const rule = this.alarmForm.get('threshold_rule') as FormGroup;
    return rule.valid;
  }

  private markStep1Touched(): void {
    ['name', 'type', 'severity'].forEach((f) => {
      this.alarmForm.get(f)?.markAsTouched();
    });
  }

  private markStep2Touched(): void {
    const rule = this.alarmForm.get('threshold_rule') as FormGroup;
    Object.keys(rule.controls).forEach((key) => rule.get(key)?.markAsTouched());
  }

  // ── Alarm type change ─────────────────────────────────────────
  onTypeChange(): void {
    // Reset threshold rule when type changes (future: adjust validators)
    this.alarmForm.get('threshold_rule')?.reset({
      resource_type: 'instance',
      aggregation_method: 'mean',
      comparison_operator: 'gt',
      granularity: 300,
      evaluation_periods: 3,
      resource_id: this.instanceId,
    });
  }

  // ── Use current instance ID ───────────────────────────────────
  useCurrentInstanceId(): void {
    this.alarmForm.get('threshold_rule.resource_id')?.setValue(this.instanceId);
  }

  // ── Preview helpers ───────────────────────────────────────────
  canShowRulePreview(): boolean {
    const rule = this.alarmForm.get('threshold_rule');
    return !!(
      rule?.get('metric')?.value &&
      rule?.get('comparison_operator')?.value &&
      rule?.get('threshold')?.value !== null
    );
  }

  getOperatorLabel(): string {
    const op = this.alarmForm.get('threshold_rule.comparison_operator')?.value;
    return this.operatorLabels[op] ?? op;
  }

  getMetricUnit(): string {
    const metric = this.alarmForm.get('threshold_rule.metric')?.value;
    return this.metricUnits[metric] ?? '';
  }

  getTypeLabel(): string {
    const type = this.alarmForm.get('type')?.value;
    return this.typeLabels[type] ?? type;
  }

  getEvalDuration(): string {
    const periods =
      this.alarmForm.get('threshold_rule.evaluation_periods')?.value ?? 0;
    const gran = this.alarmForm.get('threshold_rule.granularity')?.value ?? 0;
    const seconds = periods * gran;
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
    return `${(seconds / 3600).toFixed(1)} h`;
  }

  // ── Submit ────────────────────────────────────────────────────
  onSubmit(): void {
    if (this.alarmForm.invalid) {
      this.alarmForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const raw = this.alarmForm.value;
    console.log('raw value:', raw);

    const filterUrls = (arr: string[]): string[] =>
      (arr || []).filter((url) => url && url.trim() !== '');

    const payload: AlarmPayload = {
      name: raw.name,
      description: raw.description || '',
      type: raw.type,
      severity: raw.severity,
      enabled: raw.enabled,
      repeat_actions: raw.repeat_actions,
      alarm_actions: filterUrls(raw.alarm_actions),
      ok_actions: filterUrls(raw.ok_actions),
      insufficient_data_actions: filterUrls(raw.insufficient_data_actions),
      time_constraints: [],
    };

    // Attach the right rule key depending on type
    if (raw.type === 'gnocchi_resources_threshold') {
      payload.gnocchi_resources_threshold_rule = {
        metric: raw.threshold_rule.metric,
        resource_type: raw.threshold_rule.resource_type,
        resource_id: raw.threshold_rule.resource_id,
        aggregation_method: raw.threshold_rule.aggregation_method,
        comparison_operator: raw.threshold_rule.comparison_operator,
        threshold: Number(raw.threshold_rule.threshold),
        granularity: Number(raw.threshold_rule.granularity),
        evaluation_periods: Number(raw.threshold_rule.evaluation_periods),
      };
    }

    this.alarmCreated.emit(payload);

    this.store.dispatch(new CreateAlarm(this.projectId, payload));
    // The parent component is responsible for calling close() after the API call
  }

  // ── Close ─────────────────────────────────────────────────────
  close(): void {
    document.body.style.overflow = ''; // ← restaure aussi à la fermeture
    this.submitting = false;
    this.currentStep = 1;
    this.buildForm();
    this.closed.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.isOpen) {
      this.close();
    }
  };
}
