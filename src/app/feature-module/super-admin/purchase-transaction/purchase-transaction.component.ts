import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil, map, filter, take } from 'rxjs/operators';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { Store } from '@ngxs/store';
import {
  GetResource,
  GetMetric,
  GetPort,
  GetTrafic,
  GetInstanceAlarms,
} from '../store/resource.store/actions.resource';
import { Observable } from 'rxjs';
import { ResourceSelector } from '../store/resource.store/selectors.resource';
import { ResourceService } from '../project-services/resource.service';

// ─────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────

interface Resource {
  id: string;
  name: string;
  status: string;
  created: Date;
  ip?: string;
  flavor?: string;
  uptime?: string;
  currentCpu?: number;
  currentRam?: number;
}

interface Alarm {
  id: string;
  name: string;
  metric: string;
  condition: string;
  threshold: number;
  unit: string;
  severity: 'critical' | 'warning' | 'info';
  status: 'ok' | 'alarm' | 'insufficient_data';
  enabled: boolean;
  description?: string;
  notificationEmail: string;
  lastTriggered?: Date;
}

interface MiniMetric {
  label: string;
  currentValue: number;
  unit: string;
  color: string;
  series: ApexAxisChartSeries;
  chartOptions?: any;
}

interface InstancePort {
  id: string;
  name: string;
  mac_address: string;
  fixed_ips: { ip_address: string; subnet_id: string }[];
  network_id: string;
  status: string;
  admin_state_up: boolean;
  device_owner: string;
  rxBytes: number;
  txBytes: number;
  rxDropped: number;
  txErrors: number;
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

@Component({
  selector: 'app-purchase-transaction',
  templateUrl: './purchase-transaction.component.html',
  styleUrls: ['./purchase-transaction.component.scss'],
  standalone: false,
})
export class PurchaseTransactionComponent implements OnInit, OnDestroy {
  // ── Route params ──────────────────────────────────────────
  projectId: string = '';
  projectName: string = '';
  resourceId: string = '';
  instanceId!: string;
  projectIt!: string;

  // ── État global ───────────────────────────────────────────
  loading: boolean = true;
  refreshing: boolean = false;
  resource: Resource | null = null;
  alarms: Alarm[] = [];
  activeTab: string = 'overview';
  timeRange: string = '24h';
  autoRefresh: boolean = true;
  lastUpdateTime: string = 'just now';

  // ── Port tab — état en 2 phases ───────────────────────────
  loadingPorts: boolean = false;
  loadingPortMetrics: boolean = false;
  loadingMetrics: boolean = false;
  loadingAlarms: boolean = false;
  interval: any;

  instancePorts: InstancePort[] = [];
  selectedPortId: string = '';
  portTimeRange: string = '24h';
  private portsAlreadyLoaded: boolean = false;

  // ── Store variables ───────────────────────────
  instance$!: Observable<any>;
  miniMetric$!: Observable<any>;
  timeSerie$!: Observable<any>;
  port$!: Observable<any>;
  portFlux$!: Observable<any>;
  alarms$!: Observable<any>;

  // ── Open modal alarm  ───────────────────────────
  showAlarmModal = false;
  instanceIdForAlarm!: string;

  get selectedPort(): InstancePort | undefined {
    return this.instancePorts.find((p) => p.id === this.selectedPortId);
  }

  // ── Séries de charts du port ──────────────────────────────
  portBandwidthSeries: ApexAxisChartSeries = [];
  portPacketRateSeries: ApexAxisChartSeries = [];
  portPacketLossSeries: ApexAxisChartSeries = [];

  // ── Séries de charts instance ─────────────────────────────
  cpuRamSeries: ApexAxisChartSeries = [];
  diskIoSeries: ApexAxisChartSeries = [];
  networkSeries: ApexAxisChartSeries = [];

  // ── Options de charts ─────────────────────────────────────
  cpuRamChartOptions: any = {};
  diskIoChartOptions: any = {};
  networkChartOptions: any = {};
  bandwidthChartOptions: any = {};
  packetRateChartOptions: any = {};
  packetLossChartOptions: any = {};

  sparklineChartOptions = {
    chart: {
      type: 'area' as const,
      height: 60,
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: { curve: 'smooth' as const, width: 2 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0 },
    },
    xaxis: { type: 'datetime' as const },
    tooltip: { x: { format: 'HH:mm' }, fixed: { enabled: false } },
  };
  alarmsLoading$!: Observable<boolean>;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private store: Store,
    public resourceService: ResourceService,
  ) {}

  ngOnInit(): void {
    // dans ngOnInit
    this.alarmsLoading$ = this.store.select(ResourceSelector.isAlarmsLoading);
    this.route.paramMap.subscribe((params) => {
      this.projectIt = params.get('projectId')!;
      this.instanceId = params.get('instanceId')!;
    });

    this.store.dispatch(
      new GetResource(this.projectIt, this.instanceId, 'instance'),
    );

    this.instance$ = this.store.select(ResourceSelector.getResource);
    this.instance$
      .pipe(
        // On ne laisse passer que si l'instance et son ID existent
        filter((instance) => !!instance && !!instance.id),
        // On prend la première occurrence qui respecte le filtre, puis on "unsubscribe" automatiquement
        take(1),
      )
      .subscribe((instance) => {
        this.instanceIdForAlarm = instance.id;
      });

    this.miniMetric$ = this.store.select(ResourceSelector.getMiniMetric).pipe(
      map((data: any) => {
        if (!data?.metrics) return [];
        return data.metrics.map((metric: any) => ({
          label: metric.label,
          currentValue: metric.currentValue,
          unit: metric.unit,
          color: metric.color,
          series: [{ name: metric.label, data: metric.timeSeries }],
        }));
      }),
    );

    this.projectId = 'proj-123';
    this.resourceId = 'inst-456';
    this.projectName = 'PROD_E-Commerce';

    this.loadResourceData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ─────────────────────────────────────────────────────────
  // Chargement initial (VM uniquement)
  // ─────────────────────────────────────────────────────────

  loadResourceData(): void {
    this.loading = true;
    setTimeout(() => {
      this.resource = this.getSampleResource();
      this.alarms = this.getSampleAlarms();
      this.initializeChartOptions();
      this.loading = false;
      this.updateLastUpdateTime();
      this.cdr.detectChanges();
    }, 1000);
  }

  // ─────────────────────────────────────────────────────────
  // Chargement des ports
  // ─────────────────────────────────────────────────────────

  private loadInstancePorts(): void {
    this.getAllPorts();
    this.loadingPorts = true;
    this.selectedPortId = '';
    this.portBandwidthSeries = [];
    this.portPacketRateSeries = [];
    this.portPacketLossSeries = [];

    this.store
      .select(ResourceSelector.getPort)
      .pipe(takeUntil(this.destroy$))
      .subscribe((ports: any[]) => {
        if (!ports || ports.length === 0) return;

        this.instancePorts = ports.map((p) => ({
          id: p.id,
          name: p.name || p.id.slice(0, 8),
          mac_address: p.mac_address,
          fixed_ips: p.fixed_ips ?? [],
          network_id: p.network_id,
          status: p.status,
          admin_state_up: p.admin_state_up,
          device_owner: p.device_owner,
          rxBytes: 0,
          txBytes: 0,
          rxDropped: 0,
          txErrors: 0,
        }));

        this.loadingPorts = false;
        this.portsAlreadyLoaded = true;
        this.cdr.detectChanges();
      });
  }

  getAllPorts(): void {
    this.store.dispatch(new GetPort(this.projectIt, this.instanceId));
  }

  fetchAllPort(): Observable<any> {
    return this.store.select(ResourceSelector.getPort);
  }

  // ─────────────────────────────────────────────────────────
  // Chargement des métriques du port sélectionné
  // ─────────────────────────────────────────────────────────

  private loadPortMetrics(): void {
    if (!this.selectedPortId) return;

    // Activer le loader local et vider les séries précédentes
    this.loadingPortMetrics = true;
    this.portBandwidthSeries = [];
    this.portPacketRateSeries = [];
    this.portPacketLossSeries = [];
    this.cdr.detectChanges();

    // Dispatcher l'action
    this.getTrafic();

    // Souscrire au store et mapper dès que les données arrivent
    this.store
      .select(ResourceSelector.getPortFlux)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        // Attendre que le store ait une réponse valide avec les métriques
        if (!response?.metrics) return;

        const { bandwidth, packetRate, packetLoss } = response.metrics;

        // ── Bandwidth ──────────────────────────────────────────
        // series est déjà au format ApexCharts [{name, color, data:[{x,y}]}]
        // on extrait name + data, et les couleurs viennent du back
        if (bandwidth?.series) {
          this.portBandwidthSeries = bandwidth.series.map((s: any) => ({
            name: s.name, // 'Inbound' | 'Outbound'
            data: s.data, // [{x: timestamp, y: value}, ...]
          }));

          // Couleurs et annotations depuis le back (écrase les valeurs initiales)
          this.bandwidthChartOptions = {
            ...this.bandwidthChartOptions,
            colors: bandwidth.series.map((s: any) => s.color),
            annotations: this.buildThresholdAnnotations(
              bandwidth.thresholds,
              bandwidth.unit,
            ),
          };
        }

        // ── Packet Rate ────────────────────────────────────────
        if (packetRate?.series) {
          this.portPacketRateSeries = packetRate.series.map((s: any) => ({
            name: s.name,
            data: s.data,
          }));

          this.packetRateChartOptions = {
            ...this.packetRateChartOptions,
            colors: packetRate.series.map((s: any) => s.color),
            annotations: this.buildThresholdAnnotations(
              packetRate.thresholds,
              packetRate.unit,
            ),
          };
        }

        // ── Packet Loss ────────────────────────────────────────
        if (packetLoss?.series) {
          this.portPacketLossSeries = packetLoss.series.map((s: any) => ({
            name: s.name,
            data: s.data,
          }));

          this.packetLossChartOptions = {
            ...this.packetLossChartOptions,
            colors: packetLoss.series.map((s: any) => s.color),
            annotations: this.buildThresholdAnnotations(
              packetLoss.thresholds,
              packetLoss.unit,
            ),
          };
        }

        // Désactiver le loader une fois toutes les séries alimentées
        this.loadingPortMetrics = false;
        this.updateLastUpdateTime();
        this.cdr.detectChanges();
      });
  }

  // ─────────────────────────────────────────────────────────
  // Helper — annotations ApexCharts depuis les thresholds du back
  // ─────────────────────────────────────────────────────────

  private buildThresholdAnnotations(
    thresholds: { warning: number; critical: number },
    unit: string,
  ): any {
    if (!thresholds) return {};
    return {
      yaxis: [
        {
          y: thresholds.warning,
          borderColor: '#F59E0B',
          strokeDashArray: 4,
          label: {
            text: `Warning — ${thresholds.warning} ${unit}`,
            style: { color: '#F59E0B', background: 'rgba(245,158,11,0.1)' },
          },
        },
        {
          y: thresholds.critical,
          borderColor: '#EF4444',
          strokeDashArray: 4,
          label: {
            text: `Critical — ${thresholds.critical} ${unit}`,
            style: { color: '#EF4444', background: 'rgba(239,68,68,0.1)' },
          },
        },
      ],
    };
  }

  getTrafic(): void {
    const intervalWindow = this.resourceService.buildRecentMetricsWindow();
    const range = {
      ...intervalWindow,
      granularity: 300,
      portId: this.selectedPortId,
    };
    this.store.dispatch(new GetTrafic(this.projectIt, this.instanceId, range));
  }

  // ─────────────────────────────────────────────────────────
  // Chargement des alarmes
  // ─────────────────────────────────────────────────────────

  loadInstanceAlarms(): void {
    this.loadingAlarms = true;
    this.cdr.detectChanges();

    this.store.dispatch(new GetInstanceAlarms(this.projectIt, this.instanceId));

    this.alarms$ = this.store.select(ResourceSelector.getInstanceAlarms);
    this.alarms$.pipe(takeUntil(this.destroy$)).subscribe((alarms: any) => {
      if (alarms === null || alarms === undefined) return;
      this.loadingAlarms = false;
      this.cdr.detectChanges();
    });
  }

  // ─────────────────────────────────────────────────────────
  // Données hardcodées (tests)
  // ─────────────────────────────────────────────────────────

  private getSampleResource(): Resource {
    return {
      id: this.resourceId,
      name: 'web-server-01',
      status: 'ACTIVE',
      created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ip: '192.168.1.10',
      flavor: 'm1.medium',
      uptime: '15d 8h 32m',
      currentCpu: 45,
      currentRam: 68,
    };
  }

  private getSampleAlarms(): Alarm[] {
    return [
      {
        id: 'alarm_001',
        name: 'High CPU Usage',
        metric: 'CPU',
        condition: '>',
        threshold: 80,
        unit: '%',
        severity: 'critical',
        status: 'ok',
        enabled: true,
        description: 'Alert when CPU usage exceeds 80% for 5 minutes',
        notificationEmail: 'admin@example.com',
      },
      {
        id: 'alarm_002',
        name: 'Memory Warning',
        metric: 'RAM',
        condition: '>',
        threshold: 85,
        unit: '%',
        severity: 'warning',
        status: 'ok',
        enabled: true,
        description: 'Alert when memory usage exceeds 85%',
        notificationEmail: 'admin@example.com',
      },
    ];
  }

  // ─────────────────────────────────────────────────────────
  // ApexCharts options
  // ─────────────────────────────────────────────────────────

  private initializeChartOptions(): void {
    const common: any = {
      chart: {
        type: 'area',
        height: 300,
        background: 'transparent',
        foreColor: '#94a3b8',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
        zoom: { enabled: true },
        animations: { enabled: true, easing: 'easeinout', speed: 800 },
      },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', width: 3 },
      grid: {
        borderColor: 'rgba(255,255,255,0.05)',
        strokeDashArray: 4,
        xaxis: { lines: { show: true } },
        yaxis: { lines: { show: true } },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: { colors: '#94a3b8' },
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM',
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
      },
      yaxis: { labels: { style: { colors: '#94a3b8' } } },
      tooltip: {
        theme: 'dark',
        x: { format: 'dd MMM HH:mm' },
        style: { fontSize: '12px', fontFamily: 'Outfit, sans-serif' },
      },
      legend: { show: false },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
    };

    this.cpuRamChartOptions = {
      ...common,
      colors: ['#3B82F6', '#10B981'],
      yaxis: {
        ...common.yaxis,
        max: 100,
        title: { text: 'Usage (%)', style: { color: '#94a3b8' } },
      },
      annotations: {
        yaxis: [
          {
            y: 80,
            borderColor: '#F59E0B',
            strokeDashArray: 4,
            label: {
              text: 'Warning Threshold',
              style: { color: '#F59E0B', background: 'rgba(245,158,11,0.1)' },
            },
          },
        ],
      },
    };

    this.diskIoChartOptions = {
      ...common,
      colors: ['#F59E0B', '#EF4444'],
      yaxis: {
        ...common.yaxis,
        title: { text: 'MB/s', style: { color: '#94a3b8' } },
      },
    };

    this.networkChartOptions = {
      ...common,
      colors: ['#8B5CF6', '#EC4899'],
      yaxis: {
        ...common.yaxis,
        title: { text: 'MB/s', style: { color: '#94a3b8' } },
      },
    };

    // Options de base pour les charts port.
    // Les couleurs et annotations seront écrasées dynamiquement
    // dans loadPortMetrics() depuis les données du back.
    this.bandwidthChartOptions = {
      ...common,
      colors: ['#2563eb', '#16a34a'], // fallback avant réponse du back
      yaxis: {
        ...common.yaxis,
        title: { text: 'Mbps', style: { color: '#94a3b8' } },
      },
    };

    this.packetRateChartOptions = {
      ...common,
      colors: ['#2563eb', '#16a34a'], // fallback avant réponse du back
      yaxis: {
        ...common.yaxis,
        title: { text: 'packets/sec', style: { color: '#94a3b8' } },
      },
    };

    this.packetLossChartOptions = {
      ...common,
      colors: ['#EF4444'], // fallback avant réponse du back
      yaxis: {
        ...common.yaxis,
        title: { text: '%', style: { color: '#94a3b8' } },
      },
    };
  }

  // ─────────────────────────────────────────────────────────
  // Contrôles des onglets
  // ─────────────────────────────────────────────────────────

  getMetrics(): void {
    this.interval = this.resourceService.buildRecentMetricsWindow();
    this.store.dispatch(
      new GetMetric(this.projectIt, this.instanceId, {
        from: this.interval.from,
        to: this.interval.to,
        granularity: 300,
      }),
    );
  }

  fetchMetric(): Observable<any> {
    return this.store.select(ResourceSelector.getTimeSerie);
  }

  switchTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'metrics') {
      this.loadingMetrics = true;
      this.getMetrics();

      this.timeSerie$ = this.fetchMetric();
      this.timeSerie$
        .pipe(takeUntil(this.destroy$))
        .subscribe((timeSerie: any) => {
          if (
            !timeSerie ||
            (!timeSerie.cpu && !timeSerie.ram && !timeSerie.disk)
          )
            return;

          this.cpuRamSeries = [
            {
              name: timeSerie.cpu?.label ?? 'CPU',
              data: timeSerie.cpu?.timeSeries ?? [],
            },
            {
              name: timeSerie.ram?.label ?? 'RAM',
              data: timeSerie.ram?.timeSeries ?? [],
            },
          ];

          this.diskIoSeries = [
            { name: 'Read', data: timeSerie.disk?.read?.timeSeries ?? [] },
            { name: 'Write', data: timeSerie.disk?.write?.timeSeries ?? [] },
          ];

          this.loadingMetrics = false;
          this.updateLastUpdateTime();
          this.cdr.detectChanges();
        });
    }

    if (tab === 'port' && !this.portsAlreadyLoaded) {
      this.loadInstancePorts();
    }

    if (tab === 'alarms') {
      this.loadInstanceAlarms();
    }
  }

  // ─────────────────────────────────────────────────────────
  // Événements du dropdown de ports
  // ─────────────────────────────────────────────────────────

  onPortChange(): void {
    if (!this.selectedPortId) {
      this.portBandwidthSeries = [];
      this.portPacketRateSeries = [];
      this.portPacketLossSeries = [];
      return;
    }
    this.loadPortMetrics();
  }

  // ─────────────────────────────────────────────────────────
  // Contrôles Metrics / Port
  // ─────────────────────────────────────────────────────────

  changeTimeRange(range: string): void {
    this.timeRange = range;
    this.updateLastUpdateTime();
  }

  changePortTimeRange(range: string): void {
    this.portTimeRange = range;
    this.loadPortMetrics();
  }

  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
  }

  refreshData(): void {
    this.refreshing = true;
    setTimeout(() => {
      this.loadResourceData();
      this.refreshing = false;
    }, 1000);
  }

  refreshMetrics(): void {
    this.switchTab('metrics');
  }
  refreshPortMetrics(): void {
    this.loadPortMetrics();
  }

  private updateLastUpdateTime(): void {
    this.lastUpdateTime = new Date().toLocaleTimeString();
  }

  // ─────────────────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────────────────

  exportMetrics(): void {
    console.log('Exporting metrics...');
  }
  openAddAlarmModal(): void {
    this.showAlarmModal = true;
  }

  onAlarmCreated(payload: any): void {
    console.log('Alarm payload:', payload);
    this.showAlarmModal = false;
  }

  toggleAlarm(alarm: Alarm): void {
    alarm.enabled = !alarm.enabled;
  }
  editAlarm(alarm: Alarm): void {
    console.log('Edit alarm:', alarm.id);
  }
  deleteAlarm(alarm: Alarm): void {
    this.alarms = this.alarms.filter((a) => a.id !== alarm.id);
  }

  restartInstance(): void {
    console.log('Restarting instance...');
  }
  stopInstance(): void {
    console.log('Stopping instance...');
  }
  createSnapshot(): void {
    console.log('Creating snapshot...');
  }
  viewLogs(): void {
    console.log('Viewing logs...');
  }
  clearConsole(): void {
    console.log('Clearing console...');
  }
  downloadLogs(): void {
    console.log('Downloading logs...');
  }

  // Dans ton component.ts
  public operatorsMap: { [key: string]: string } = {
    gt: '>',
    lt: '<',
    ge: '≥',
    le: '≤',
    eq: '=',
    ne: '≠',
  };

  // Tu peux aussi mapper les unités selon la métrique
  public getUnit(metric: string): string {
    const units: { [key: string]: string } = {
      cpu: '%',
      memory: 'MB',
      'network.incoming.bytes': 'B/s',
    };
    return units[metric] || '';
  }
}
