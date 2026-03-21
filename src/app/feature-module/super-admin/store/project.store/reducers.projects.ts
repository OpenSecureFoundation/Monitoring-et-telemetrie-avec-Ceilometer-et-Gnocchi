import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { State } from '@ngxs/store';
import { catchError } from 'rxjs';
import { ToasterService } from 'src/app/core/core.index';
import { routes } from 'src/app/core/core.index';
import { Router } from '@angular/router';
import { ProjectService } from '../../project-services/project.service';
import { ProjectStateModel } from './state.projects';
import { GetProject, GetProjects } from './actions.projects';

@Injectable({ providedIn: 'root' })
export class ProjectHandler {
  constructor(
    private projectService: ProjectService,
    private toaster: ToasterService,
    private router: Router,
  ) {}

  getProjectsHandler(
    Context: StateContext<ProjectStateModel>,
    action: GetProjects,
  ) {
    const state = Context.getState();
    this.projectService.getProjects().subscribe((res) => {
      if (res) {
        console.log('res: ', res);
        Context.setState({
          ...state,
          projects: res.projects,
          stats: res.stats,
        });
      }
    });
  }

  getProjectHandler(
    context: StateContext<ProjectStateModel>,
    action: GetProject,
  ) {
    const state = context.getState();
    this.projectService.getProject(action.projectId).subscribe((res) => {
      if (res) {
        console.log('res: ', res);
        context.setState({
          ...state,
          project: res.project,
        });
      }
    });
  }
}
