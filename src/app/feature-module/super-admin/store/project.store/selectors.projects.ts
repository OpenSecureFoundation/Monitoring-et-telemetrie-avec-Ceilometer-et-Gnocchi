import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { ProjectStateModel } from './state.projects';
import { ProjectState } from './state.projects';

@Injectable({ providedIn: 'root' })
export class ProjectSelector {
  constructor() {}

  /**
   * Extrait la liste complète de tous les projets du State.
   * On l'utilise généralement pour afficher un tableau ou une liste.
   */
  @Selector([ProjectState])
  static getProjects(state: ProjectStateModel) {
    return state.projects;
  }

  /**
   * Extrait les détails d'un projet unique (le dernier projet sélectionné).
   * Utile pour afficher une page de détails ou un formulaire d'édition.
   */
  @Selector([ProjectState])
  static getProject(state: ProjectStateModel) {
    return state.project;
  }

  /**
   * Extrait les statistiques globales liées aux projets (ex: nombre total, budget, etc.).
   */
  @Selector([ProjectState])
  static getStat(state: ProjectStateModel) {
    return state.stats;
  }
}