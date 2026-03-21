import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { routes, DataService, SpinnerService } from 'src/app/core/core.index';
import { PaginationService } from 'src/app/shared/sharedIndex';
import { GetAlerts } from '../store/aodh.store/actions.aodh';
import { Observable, takeUntil, Subject } from 'rxjs';
import { AodhSelector } from '../store/aodh.store/selectors.aodh';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.scss'],
  standalone: false,
})
export class DomainComponent implements OnInit, OnDestroy {
  public routes = routes;
  alerts$!: Observable<any>;
  stats$!: Observable<any>;
  projects$!: Observable<any>;
  alertsData$!: Observable<any>;

  destroy$ = new Subject<void>();

  constructor(
    private data: DataService,
    private pagination: PaginationService,
    private router: Router,
    public spinnerService: SpinnerService, // Replace with your actual SpinnerService
    private store: Store,
    private aodhSlector: AodhSelector,
  ) {}

  // Alerts
  alerts: any;

  // Filters
  severityFilter: string = 'all';
  resourceTypeFilter: string = 'all';
  projectFilter: string = 'all';

  // View mode
  viewMode: 'list' | 'timeline' | 'grid' = 'list';

  // Filtered alerts
  filteredAlerts: any[] = [];

  // Last update time
  lastUpdateTime: string = 'just now';

  ngOnInit(): void {
    // TODO: Replace with actual service call
    this.store.dispatch(new GetAlerts());

    this.alerts$ = this.store.select(AodhSelector.getAlerts);
    this.alerts$.pipe(takeUntil(this.destroy$)).subscribe((alerts) => {
      console.log('alerts: ', alerts);
      this.alerts = alerts;
      this.applyFilters();
    });

    // Select stats from store
    this.stats$ = this.store.select(AodhSelector.getStats);
    this.stats$.pipe(takeUntil(this.destroy$)).subscribe((stats) => {
      console.log('stats: ', stats);
    });

    // Select projects from store
    this.projects$ = this.store.select(AodhSelector.getProjects);
    this.projects$.pipe(takeUntil(this.destroy$)).subscribe((projects) => {
      console.log('projects: ', projects);
    });

    // Update last update time
    this.updateLastUpdateTime();
  }

  /**
   * Filter alerts by severity
   */
  filterBySeverity(severity: string): void {
    this.severityFilter = severity;
    this.applyFilters();
  }

  /**
   * Apply all filters
   */
  applyFilters(): void {
    let filtered = [...this.alerts];

    // Filter by severity
    if (this.severityFilter !== 'all') {
      filtered = filtered.filter(
        (alert: any) => alert.severity === this.severityFilter,
      );
    }

    // Filter by resource type
    if (this.resourceTypeFilter !== 'all') {
      filtered = filtered.filter(
        (alert: any) => alert.resourceType === this.resourceTypeFilter,
      );
    }

    // Filter by project
    if (this.projectFilter !== 'all') {
      filtered = filtered.filter(
        (alert: any) => alert.projectId === this.projectFilter,
      );
    }

    this.filteredAlerts = filtered;
  }

  /**
   * Acknowledge a single alert
   */
  acknowledgeAlert(alert: any): void {
    console.log('Acknowledging alert:', alert.id);
    alert.acknowledged = true;
    alert.acknowledgedBy = 'current.user@example.com'; // Replace with actual user
    alert.acknowledgedAt = new Date();

    // TODO: Call API to acknowledge alert
    // this.alertsService.acknowledgeAlert(alert.id).subscribe(...)
  }

  /**
   * Acknowledge all alerts
   */
  acknowledgeAll(): void {
    console.log('Acknowledging all alerts');
    this.filteredAlerts.forEach((alert) => {
      if (!alert.acknowledged) {
        this.acknowledgeAlert(alert);
      }
    });

    // TODO: Call API to acknowledge all
  }

  /**
   * View alert details
   */
  viewAlertDetails(alert: any): void {
    console.log('Viewing alert details:', alert);
    // TODO: Open modal or navigate to details page
  }

  /**
   * Mute an alert
   */
  muteAlert(alert: any): void {
    console.log('Muting alert:', alert.id);
    // TODO: Implement mute logic
  }

  /**
   * Dismiss an alert
   */
  dismissAlert(alert: any): void {
    console.log('Dismissing alert:', alert.id);
    // TODO: Implement dismiss logic
    // Remove from filtered list
    this.filteredAlerts = this.filteredAlerts.filter((a) => a.id !== alert.id);
  }

  /**
   * Refresh alerts data
   */
  refreshAlerts(): void {
    console.log('Refreshing alerts...');
    this.store.dispatch(new GetAlerts());
    this.updateLastUpdateTime();
  }

  /**
   * Update last update time
   */
  private updateLastUpdateTime(): void {
    const now = new Date();
    this.lastUpdateTime = now.toLocaleTimeString();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
