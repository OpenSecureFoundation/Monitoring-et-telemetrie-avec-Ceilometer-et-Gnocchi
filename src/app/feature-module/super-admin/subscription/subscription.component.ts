import { ProjectSelector } from '../store/project.store/selectors.projects';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SpinnerService } from 'src/app/core/core.index';

import { GetProjects } from '../store/project.store/actions.projects';
import { Observable } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  standalone: false,
})
export class SubscriptionComponent implements OnInit {
  allProject$!: Observable<any[]>;
  stat$!: Observable<any>;

  filteredProjects: any[] = [];
  currentFilter: 'all' | 'active' | 'inactive' = 'all';

  constructor(
    private router: Router,
    private store: Store,
    public spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    // Dispatch action to load projects
    this.store.dispatch(new GetProjects());

    // Select projects from store
    this.allProject$ = this.store.select(ProjectSelector.getProjects);

    // Subscribe to projects and initialize filtered list
    this.allProject$.subscribe((projects) => {
      console.log('projects: ', projects);
      this.filterProjects(this.currentFilter);
    });

    // Select stats from store
    this.stat$ = this.store.select(ProjectSelector.getStat);
    this.stat$.subscribe((stat) => {
      console.log('stat: ', stat);
    });
  }

  /**
   * Filter projects based on status
   * @param filter 'all' | 'active' | 'inactive'
   */
  filterProjects(filter: 'all' | 'active' | 'inactive'): void {
    this.currentFilter = filter;

    this.allProject$.subscribe((projects) => {
      switch (filter) {
        case 'active':
          this.filteredProjects = projects.filter((p: any) => p.enabled);
          break;
        case 'inactive':
          this.filteredProjects = projects.filter((p: any) => !p.enabled);
          break;
        case 'all':
        default:
          this.filteredProjects = projects;
          break;
      }
    });
  }

  /**
   * View project details
   * @param project The project to view
   */
  viewProject(project: any): void {
    console.log('View project:', project);
    // TODO: Implement view logic
    // Exemple: this.router.navigate(['/projects', project.id]);
    this.router.navigateByUrl(`${routes.companies}/${project.id}`);
  }

  /**
   * Edit project
   * @param project The project to edit
   */
  editProject(project: any): void {
    console.log('Edit project:', project);
    // TODO: Implement edit logic
    // Exemple: ouvrir un modal d'édition
  }

  /**
   * Delete project
   * @param project The project to delete
   */
  deleteProject(project: any): void {
    console.log('Delete project:', project);
    // TODO: Implement delete logic
    // La modal de confirmation est déjà dans le template
  }

  /**
   * Sort data (si vous utilisez MatSort)
   * @param event MatSort event
   */
  sortData(event: any): void {
    console.log('Sort event:', event);
    // TODO: Implement sorting logic if needed
  }
}
