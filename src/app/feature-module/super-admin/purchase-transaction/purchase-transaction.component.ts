import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexStroke,
  ApexDataLabels,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
  ApexAnnotations,
  ApexFill,
} from 'ng-apexcharts';

// Interfaces
interface Resource {
  id: string;
  name: string;
  status: string;
  created: Date;

  // Instance specific
  ip?: string;
  flavor?: string;
  uptime?: string;
  currentCpu?: number;
  currentRam?: number;

  // Volume specific
  size?: number;
  usagePercent?: number;
  attachedTo?: string;
  volumeType?: string;

  // Network specific
  subnet?: string;
  activePorts?: number;
  maxPorts?: number;
  floatingIps?: number;
  maxFloatingIps?: number;
  connectedRouters?: number;
  subnets?: number;
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

@Component({
  selector: 'app-purchase-transaction',
  templateUrl: './purchase-transaction.component.html',
  styleUrls: ['./purchase-transaction.component.scss'],
  standalone: false,
  // encapsulation: ViewEncapsulation.None
})
export class PurchaseTransactionComponent {
  // Route params
  projectId: string = '';
  projectName: string = '';
  resourceType: 'instance' | 'volume' | 'network' = 'instance';
  resourceId: string = '';

  // State
  loading: boolean = true;
  refreshing: boolean = false;
  resource: Resource | null = null;
  alarms: Alarm[] = [];
  activeTab: string = 'overview';
  timeRange: string = '24h';
  autoRefresh: boolean = true;
  lastUpdateTime: string = 'just now';

  // Mini metrics for overview
  miniMetrics: MiniMetric[] = [];

  // Volume specific
  volumeUsed: number = 0;
  volumeTotal: number = 0;
  volumeUsagePercent: number = 0;

  // Chart data
  cpuRamSeries: ApexAxisChartSeries = [];
  diskIoSeries: ApexAxisChartSeries = [];
  networkSeries: ApexAxisChartSeries = [];
  iopsSeries: ApexAxisChartSeries = [];
  latencySeries: ApexAxisChartSeries = [];
  bandwidthSeries: ApexAxisChartSeries = [];
  packetRateSeries: ApexAxisChartSeries = [];
  packetLossSeries: ApexAxisChartSeries = [];

  // Chart options
  cpuRamChartOptions: any = {};
  diskIoChartOptions: any = {};
  networkChartOptions: any = {};
  iopsChartOptions: any = {};
  latencyChartOptions: any = {};
  bandwidthChartOptions: any = {};
  packetRateChartOptions: any = {};
  packetLossChartOptions: any = {};
  sparklineChartOptions: any = {};

  private destroy$ = new Subject<void>();
  private refreshInterval$ = interval(30000); // 30 seconds

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // ✅ VALEURS DE TEST HARDCODÉES
    this.projectId = 'proj-123';
    this.resourceType = 'network'; // ⬅️ FORCEZ 'instance'
    this.resourceId = 'inst-456';
    this.projectName = 'PROD_E-Commerce';

    console.log('🚀 Starting with resourceType:', this.resourceType);

    // Charger les données immédiatement
    this.loadResourceData();

    // Setup auto-refresh
    this.refreshInterval$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.autoRefresh && this.activeTab === 'metrics') {
        this.refreshMetrics();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Load resource data
   */
  loadResourceData(): void {
    this.loading = true;

    // TODO: Replace with actual API call

    // Sample data
    setTimeout(() => {
      // this.resource = this.getSampleResource();
      // this.projectName = 'PROD_E-Commerce';
      // this.alarms = this.getSampleAlarms();

      this.resource = this.getSampleResource();
      this.projectName = 'PROD_E-Commerce';
      this.alarms = this.getSampleAlarms();
      this.initializeChartOptions();
      this.generateChartData();
      this.generateMiniMetrics();
      this.loading = false;
      this.updateLastUpdateTime();

      // ✅ FORCEZ LA DÉTECTION
      this.cdr.detectChanges();

      // ✅ PUIS GÉNÉREZ LES DONNÉES
      this.generateChartData();
      this.generateMiniMetrics();

      this.loading = false;
      this.updateLastUpdateTime();
    }, 1000);
  }
  /**
   * Get sample resource data
   */
  private getSampleResource(): Resource {
    const baseResource = {
      id: this.resourceId,
      name: `${this.resourceType}-001`,
      status: 'ACTIVE',
      created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    };

    switch (this.resourceType) {
      case 'instance':
        return {
          ...baseResource,
          name: 'web-server-01',
          ip: '192.168.1.10',
          flavor: 'm1.medium',
          uptime: '15d 8h 32m',
          currentCpu: 45,
          currentRam: 68,
        };

      case 'volume':
        return {
          ...baseResource,
          name: 'backup-vol-prod',
          size: 500,
          usagePercent: 90,
          attachedTo: 'web-server-01',
          volumeType: 'SSD',
        };

      case 'network':
        return {
          ...baseResource,
          name: 'private-network',
          subnet: '192.168.1.0/24',
          activePorts: 12,
          maxPorts: 250,
          floatingIps: 5,
          maxFloatingIps: 10,
          connectedRouters: 2,
          subnets: 3,
        };

      default:
        return baseResource;
    }
  }

  /**
   * Get sample alarms
   */
  private getSampleAlarms(): Alarm[] {
    const baseAlarms = [
      {
        id: 'alarm_001',
        name: 'High CPU Usage',
        metric: 'CPU',
        condition: '>',
        threshold: 80,
        unit: '%',
        severity: 'critical' as const,
        status: 'ok' as const,
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
        severity: 'warning' as const,
        status: 'ok' as const,
        enabled: true,
        description: 'Alert when memory usage exceeds 85%',
        notificationEmail: 'admin@example.com',
      },
    ];

    if (this.resourceType === 'volume') {
      return [
        {
          id: 'alarm_003',
          name: 'Volume Nearly Full',
          metric: 'Usage',
          condition: '>',
          threshold: 90,
          unit: '%',
          severity: 'critical' as const,
          status: 'alarm' as const,
          enabled: true,
          description: 'Alert when volume usage exceeds 90%',
          notificationEmail: 'admin@example.com',
          lastTriggered: new Date(),
        },
      ];
    }

    if (this.resourceType === 'network') {
      return [
        {
          id: 'alarm_004',
          name: 'High Packet Loss',
          metric: 'Packet Loss',
          condition: '>',
          threshold: 3,
          unit: '%',
          severity: 'critical' as const,
          status: 'ok' as const,
          enabled: true,
          description: 'Alert when packet loss exceeds 3%',
          notificationEmail: 'admin@example.com',
        },
      ];
    }

    return baseAlarms;
  }

  /**
   * Generate chart data
   */
  private generateChartData(): void {
    const timePoints = this.getTimePoints();

    console.log('🔍 Time points:', timePoints.length);
    console.log('🔍 Resource type:', this.resourceType);

    switch (this.resourceType) {
      case 'instance':
        this.generateInstanceCharts(timePoints);
        console.log('📊 CPU/RAM Series:', this.cpuRamSeries);
        break;
      case 'volume':
        this.generateVolumeCharts(timePoints);
        console.log('📊 IOPS Series:', this.iopsSeries);
        break;
      case 'network':
        this.generateNetworkCharts(timePoints);
        console.log('📊 Bandwidth Series:', this.bandwidthSeries);
        break;
    }
  }
  /**
   * Get time points based on time range
   */
  private getTimePoints(): number[] {
    const now = Date.now();
    const points: number[] = [];
    let interval = 0;
    let count = 0;

    switch (this.timeRange) {
      case '1h':
        interval = 2 * 60 * 1000; // 2 minutes
        count = 30;
        break;
      case '6h':
        interval = 10 * 60 * 1000; // 10 minutes
        count = 36;
        break;
      case '24h':
        interval = 30 * 60 * 1000; // 30 minutes
        count = 48;
        break;
      case '7d':
        interval = 6 * 60 * 60 * 1000; // 6 hours
        count = 28;
        break;
    }

    for (let i = count; i >= 0; i--) {
      points.push(now - i * interval);
    }

    return points;
  }

  /**
   * Generate random data with trend
   */
  private generateRandomData(
    points: number[],
    min: number,
    max: number,
    baseline: number,
  ): any[] {
    return points.map((time) => ({
      x: time,
      y: Math.max(min, Math.min(max, baseline + (Math.random() - 0.5) * 20)),
    }));
  }

  /**
   * Generate instance charts
   */
  private generateInstanceCharts(timePoints: number[]): void {
    // CPU & RAM
    this.cpuRamSeries = [
      {
        name: 'CPU',
        data: this.generateRandomData(timePoints, 0, 100, 45),
      },
      {
        name: 'RAM',
        data: this.generateRandomData(timePoints, 0, 100, 68),
      },
    ];

    // Disk I/O
    this.diskIoSeries = [
      {
        name: 'Read',
        data: this.generateRandomData(timePoints, 0, 500, 150),
      },
      {
        name: 'Write',
        data: this.generateRandomData(timePoints, 0, 400, 100),
      },
    ];

    // Network
    this.networkSeries = [
      {
        name: 'Inbound',
        data: this.generateRandomData(timePoints, 0, 1000, 300),
      },
      {
        name: 'Outbound',
        data: this.generateRandomData(timePoints, 0, 800, 200),
      },
    ];
  }

  /**
   * Generate volume charts
   */
  private generateVolumeCharts(timePoints: number[]): void {
    // Usage
    this.volumeUsed = 450;
    this.volumeTotal = 500;
    this.volumeUsagePercent = Math.round(
      (this.volumeUsed / this.volumeTotal) * 100,
    );

    // IOPS
    this.iopsSeries = [
      {
        name: 'Read IOPS',
        data: this.generateRandomData(timePoints, 0, 5000, 2000),
      },
      {
        name: 'Write IOPS',
        data: this.generateRandomData(timePoints, 0, 4000, 1500),
      },
    ];

    // Latency
    this.latencySeries = [
      {
        name: 'Latency',
        data: this.generateRandomData(timePoints, 0, 20, 8),
      },
    ];
  }

  /**
   * Generate network charts
   */
  private generateNetworkCharts(timePoints: number[]): void {
    // Bandwidth
    this.bandwidthSeries = [
      {
        name: 'Inbound',
        data: this.generateRandomData(timePoints, 0, 1000, 400),
      },
      {
        name: 'Outbound',
        data: this.generateRandomData(timePoints, 0, 800, 300),
      },
    ];

    // Packet Rate
    this.packetRateSeries = [
      {
        name: 'Packets/s',
        data: this.generateRandomData(timePoints, 0, 50000, 20000),
      },
    ];

    // Packet Loss
    this.packetLossSeries = [
      {
        name: 'Packet Loss',
        data: this.generateRandomData(timePoints, 0, 5, 1),
      },
    ];
  }

  /**
   * Generate mini metrics for overview
   */
  private generateMiniMetrics(): void {
    const timePoints = this.getTimePoints().slice(-10);

    if (this.resourceType === 'instance') {
      this.miniMetrics = [
        {
          label: 'CPU',
          currentValue: 45,
          unit: '%',
          color: '#3B82F6',
          series: [
            {
              name: 'CPU',
              data: this.generateRandomData(timePoints, 0, 100, 45),
            },
          ],
          // ✅ AJOUTEZ CES OPTIONS
          chartOptions: {
            ...this.sparklineChartOptions,
            stroke: {
              ...this.sparklineChartOptions.stroke,
              colors: ['#3B82F6'],
            },
          },
        },
        {
          label: 'RAM',
          currentValue: 68,
          unit: '%',
          color: '#10B981',
          series: [
            {
              name: 'RAM',
              data: this.generateRandomData(timePoints, 0, 100, 68),
            },
          ],
          chartOptions: {
            ...this.sparklineChartOptions,
            stroke: {
              ...this.sparklineChartOptions.stroke,
              colors: ['#10B981'],
            },
          },
        },
        {
          label: 'Disk I/O',
          currentValue: 150,
          unit: ' MB/s',
          color: '#F59E0B',
          series: [
            {
              name: 'Disk',
              data: this.generateRandomData(timePoints, 0, 500, 150),
            },
          ],
          chartOptions: {
            ...this.sparklineChartOptions,
            stroke: {
              ...this.sparklineChartOptions.stroke,
              colors: ['#F59E0B'],
            },
          },
        },
      ];
    }
  }

  /**
   * Initialize ApexCharts options
   */
  private initializeChartOptions(): void {
    const commonOptions = {
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
        zoom: {
          enabled: true,
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      grid: {
        borderColor: 'rgba(255, 255, 255, 0.05)',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#94a3b8',
          },
          datetimeFormatter: {
            year: 'yyyy',
            month: 'MMM',
            day: 'dd MMM',
            hour: 'HH:mm',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#94a3b8',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'dd MMM HH:mm',
        },
        style: {
          fontSize: '12px',
          fontFamily: 'Outfit, sans-serif',
        },
      },
      legend: {
        show: false,
      },
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

    // CPU & RAM Chart
    this.cpuRamChartOptions = {
      ...commonOptions,
      colors: ['#3B82F6', '#10B981'],
      yaxis: {
        ...commonOptions.yaxis,
        max: 100,
        title: {
          text: 'Usage (%)',
          style: {
            color: '#94a3b8',
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: 80,
            borderColor: '#F59E0B',
            strokeDashArray: 4,
            label: {
              text: 'Warning Threshold',
              style: {
                color: '#F59E0B',
                background: 'rgba(245, 158, 11, 0.1)',
              },
            },
          },
        ],
      },
    };

    // Disk I/O Chart
    this.diskIoChartOptions = {
      ...commonOptions,
      colors: ['#F59E0B', '#EF4444'],
      yaxis: {
        ...commonOptions.yaxis,
        title: {
          text: 'MB/s',
          style: {
            color: '#94a3b8',
          },
        },
      },
    };

    // Network Chart
    this.networkChartOptions = {
      ...commonOptions,
      colors: ['#8B5CF6', '#EC4899'],
      yaxis: {
        ...commonOptions.yaxis,
        title: {
          text: 'MB/s',
          style: {
            color: '#94a3b8',
          },
        },
      },
    };

    // IOPS Chart
    this.iopsChartOptions = {
      ...commonOptions,
      colors: ['#3B82F6', '#F59E0B'],
      yaxis: {
        ...commonOptions.yaxis,
        title: {
          text: 'IOPS',
          style: {
            color: '#94a3b8',
          },
        },
      },
    };

    // Latency Chart
    this.latencyChartOptions = {
      ...commonOptions,
      colors: ['#10B981'],
      yaxis: {
        ...commonOptions.yaxis,
        title: {
          text: 'ms',
          style: {
            color: '#94a3b8',
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: 15,
            borderColor: '#F59E0B',
            strokeDashArray: 4,
            label: {
              text: 'Acceptable Threshold',
              style: {
                color: '#F59E0B',
                background: 'rgba(245, 158, 11, 0.1)',
              },
            },
          },
        ],
      },
    };

    // Bandwidth Chart
    this.bandwidthChartOptions = {
      ...commonOptions,
      colors: ['#3B82F6', '#10B981'],
      yaxis: {
        ...commonOptions.yaxis,
        title: {
          text: 'Mbps',
          style: {
            color: '#94a3b8',
          },
        },
      },
    };

    // Packet Rate Chart
    this.packetRateChartOptions = {
      ...commonOptions,
      colors: ['#F59E0B'],
      yaxis: {
        ...commonOptions.yaxis,
        title: {
          text: 'pkt/s',
          style: {
            color: '#94a3b8',
          },
        },
      },
    };

    // Packet Loss Chart
    this.packetLossChartOptions = {
      ...commonOptions,
      colors: ['#EF4444'],
      yaxis: {
        ...commonOptions.yaxis,
        max: 5,
        title: {
          text: '%',
          style: {
            color: '#94a3b8',
          },
        },
      },
      annotations: {
        yaxis: [
          {
            y: 3,
            borderColor: '#EF4444',
            strokeDashArray: 4,
            label: {
              text: 'Critical Threshold',
              style: {
                color: '#EF4444',
                background: 'rgba(239, 68, 68, 0.1)',
              },
            },
          },
        ],
      },
    };

    // Sparkline Chart
    this.sparklineChartOptions = {
      chart: {
        type: 'area',
        height: 60,
        sparkline: {
          enabled: true,
        },
        background: 'transparent',
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.1,
        },
      },
      tooltip: {
        enabled: false,
      },
    };
  }

  /**
   * Switch tab
   */
  switchTab(tab: string): void {
    this.activeTab = tab;

    if (tab === 'metrics' && !this.cpuRamSeries.length) {
      this.generateChartData();
    }
  }

  /**
   * Change time range
   */
  changeTimeRange(range: string): void {
    this.timeRange = range;
    this.generateChartData();
    this.updateLastUpdateTime();
  }

  /**
   * Toggle auto refresh
   */
  toggleAutoRefresh(): void {
    this.autoRefresh = !this.autoRefresh;
  }

  /**
   * Refresh data
   */
  refreshData(): void {
    this.refreshing = true;

    setTimeout(() => {
      this.loadResourceData();
      this.refreshing = false;
    }, 1000);
  }

  /**
   * Refresh metrics
   */
  refreshMetrics(): void {
    this.generateChartData();
    this.updateLastUpdateTime();
  }

  /**
   * Update last update time
   */
  private updateLastUpdateTime(): void {
    const now = new Date();
    this.lastUpdateTime = now.toLocaleTimeString();
  }

  /**
   * Export metrics
   */
  exportMetrics(): void {
    console.log('Exporting metrics...');
    // TODO: Implement export functionality
  }

  /**
   * Alarm actions
   */
  openAddAlarmModal(): void {
    console.log('Opening add alarm modal...');
    // TODO: Implement modal
  }

  toggleAlarm(alarm: Alarm): void {
    alarm.enabled = !alarm.enabled;
    console.log('Toggle alarm:', alarm.id, alarm.enabled);
    // TODO: Call API
  }

  editAlarm(alarm: Alarm): void {
    console.log('Edit alarm:', alarm.id);
    // TODO: Implement edit
  }

  deleteAlarm(alarm: Alarm): void {
    console.log('Delete alarm:', alarm.id);
    // TODO: Implement delete with confirmation
    this.alarms = this.alarms.filter((a) => a.id !== alarm.id);
  }

  /**
   * Instance actions
   */
  restartInstance(): void {
    console.log('Restarting instance...');
    // TODO: Implement
  }

  stopInstance(): void {
    console.log('Stopping instance...');
    // TODO: Implement
  }

  createSnapshot(): void {
    console.log('Creating snapshot...');
    // TODO: Implement
  }

  viewLogs(): void {
    console.log('Viewing logs...');
    // TODO: Implement
  }

  /**
   * Volume actions
   */
  viewAttachedInstance(): void {
    if (this.resource?.attachedTo) {
      // TODO: Navigate to instance
      console.log('Navigate to instance:', this.resource.attachedTo);
    }
  }

  /**
   * Console actions
   */
  clearConsole(): void {
    console.log('Clearing console...');
    // TODO: Implement
  }

  downloadLogs(): void {
    console.log('Downloading logs...');
    // TODO: Implement
  }

  getStroke(metric: any): ApexStroke {
    return {
      ...this.sparklineChartOptions.stroke,
      colors: [metric.color],
    };
  }
}
