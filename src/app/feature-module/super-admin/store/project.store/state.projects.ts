import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Project } from '../../models/project.model';
import { Stats } from '../../models/stats.model';
import { GetProjects, GetProject } from './actions.projects';
import { ProjectHandler } from './reducers.projects';
import { ProjectService } from '../../project-services/project.service';

// This is the state interface for the project state
export interface ProjectStateModel {
  project: any;
  projects: Project[];
  stats: Stats;
}

@Injectable({ providedIn: 'root' })
// this is decorator that binds the class to the state
@State<ProjectStateModel>({
  name: 'project',
  defaults: {
    project: null,
    projects: [] as Project[],
    stats: {} as Stats,
  },
})

// This is the state class for the project state
export class ProjectState {
  constructor(
    private projectService: ProjectService,
    private projectHandler: ProjectHandler,
  ) {}

  @Action(GetProjects)
  getAllProject(ctx: StateContext<ProjectStateModel>, action: GetProjects) {
    console.log('Get all projects action dispatched: ', action, ctx);
    this.projectHandler.getProjectsHandler(ctx, action);
  }

  @Action(GetProject)
  getProject(ctx: StateContext<ProjectStateModel>, action: GetProject) {
    console.log('Get project action dispatched: ', action, ctx);
    this.projectHandler.getProjectHandler(ctx, action);
  }
}
