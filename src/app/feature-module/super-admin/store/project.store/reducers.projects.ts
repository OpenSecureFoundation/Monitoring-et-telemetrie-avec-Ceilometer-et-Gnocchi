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
/**
   * Gère la récupération de TOUS les projets.
   * @param Context Permet de lire/modifier l'état des projets.
   * @param action L'action GetProjects déclenchée.
   */
  getProjectsHandler(
    Context: StateContext<ProjectStateModel>,
    action: GetProjects,
  ) {
    // 1. On récupère l'état actuel pour ne pas perdre les autres données
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

  /**
   * Gère la récupération d'un projet UNIQUE via son ID.
   * @param context Contexte du State.
   * @param action Contient le 'projectId' envoyé par le composant.
   */

  getProjectHandler(
    context: StateContext<ProjectStateModel>,
    action: GetProject,
  ) {
    const state = context.getState();
    // On passe l'ID contenu dans l'action au service
    this.projectService.getProject(action.projectId).subscribe((res) => {
      if (res) {
        console.log('res: ', res);
        // Mise à jour du State pour le projet spécifique sélectionné
        context.setState({
          ...state,
          project: res.project,
        });
      }
    });
  }
}
