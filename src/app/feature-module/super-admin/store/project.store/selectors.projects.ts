import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { ProjectStateModel } from './state.projects';
import { ProjectState } from './state.projects';

@Injectable({ providedIn: 'root' })
export class ProjectSelector {
  constructor() {}

  @Selector([ProjectState])
  static getProjects(state: ProjectStateModel) {
    return state.projects;
  }

  @Selector([ProjectState])
  static getProject(state: ProjectStateModel) {
    return state.project;
  }

  @Selector([ProjectState])
  static getStat(state: ProjectStateModel) {
    return state.stats;
  }
}
