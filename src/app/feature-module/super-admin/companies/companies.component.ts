import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProject } from '../store/project.store/actions.projects';
import { ProjectSelector } from '../store/project.store/selectors.projects';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  standalone: false,
})
export class CompaniesComponent implements OnInit {
  projectId!: string;
  project$!: Observable<any>;

  // Active tab
  activeTab: string = 'dashboard';

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    public spinnerService: SpinnerService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.projectId = params['id'];
      console.log(this.projectId);
    });

    this.store.dispatch(new GetProject(this.projectId));

    this.project$ = this.store.select(ProjectSelector.getProject);

    this.project$.subscribe((project) => {
      console.log('project: ', project);
    });

    this.project$
      .pipe(
        tap((valeur) => {
          console.log('Flux project$ émet :', valeur);
          if (valeur === undefined) {
            console.warn('Attention : La valeur est undefined !');
          }
        }),
      )
      .subscribe((project) => {
        console.log('project: ', project);
      });
  }

  loadProjectDetails(projectId: string): void {
    console.log('Loading project details for:', projectId);
  }

  switchTab(tabName: string): void {
    this.activeTab = tabName;
  }

  copyProjectId(): void {
    navigator.clipboard
      .writeText(this.projectId)
      .then(() => {
        console.log('Project ID copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy project ID:', err);
      });
  }

  getStatusClass(status: string): string {
    return status === 'active' ? 'active' : 'suspended';
  }

  getCpuClass(usage: number): string {
    if (usage >= 90) return 'danger';
    if (usage >= 70) return 'warning';
    return '';
  }

  getRamClass(usage: number): string {
    if (usage >= 90) return 'danger';
    if (usage >= 70) return 'warning';
    return '';
  }

  openConsole(instance: any): void {
    console.log('Opening console for:', instance.name);
  }

  viewMetrics(instance: any): void {
    console.log('Viewing metrics for:', instance.name);
  }

  startInstance(instance: any): void {
    console.log('Starting instance:', instance.name);
  }

  getStorageUsagePercent(project: any): number {
    const used = project?.quotas?.storage?.volumes?.used ?? 0;
    const limit = project?.quotas?.storage?.volumes?.limit ?? 0;
    if (limit === 0) return 0;
    return Math.round((used / limit) * 100);
  }

  /**
   * Returns an array of N items to render filled size-block divs.
   * Capped at 10 blocks max for visual representation.
   */
  getFilledBlocks(sizeGb: number): number[] {
    const blocks = Math.min(sizeGb, 10);
    return Array(blocks).fill(0);
  }

  /**
   * Returns an array of empty blocks to complete the 10-block row.
   */
  getEmptyBlocks(sizeGb: number): number[] {
    const filled = Math.min(sizeGb, 10);
    const empty = Math.max(0, 10 - filled);
    return Array(empty).fill(0);
  }

  /**
   * Returns 1 or 2 uppercase initials from a username.
   * e.g. "Ronice-admin" → "RA", "glance" → "GL"
   */
  getUserInitials(name: string): string {
    if (!name) return '?';
    const parts = name.split(/[-_\s]+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  viewResource(instance: any): void {
    console.log('Viewing resource for:', instance.name);
    this.router.navigateByUrl(
      `${routes.purchaseTransaction}/project/${this.projectId}/instance/${instance.id}`,
    );
  }
}
