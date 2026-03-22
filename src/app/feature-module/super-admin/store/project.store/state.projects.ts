import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Project } from '../../models/project.model';
import { Stats } from '../../models/stats.model';
import { GetProjects, GetProject } from './actions.projects';
import { ProjectHandler } from './reducers.projects';
import { ProjectService } from '../../project-services/project.service';

/**
 * 1. DÉFINITION DU MODÈLE (INTERFACE)
 * C'est le contrat qui définit ce que nous stockons précisément.
 */
export interface ProjectStateModel {
  project: any;        // Détails d'un projet spécifique (sélectionné)
  projects: Project[]; // Liste complète des projets
  stats: Stats;        // Objet contenant les statistiques globales
}

@Injectable({ providedIn: 'root' })
/**
 * 2. DÉCORATEUR @State
 * Définit ce bloc comme une partie du Store global.
 * - name : 'project' sera la clé dans ton objet d'état global.
 * - defaults : Initialise les données à vide pour éviter les erreurs "undefined".
 */
@State<ProjectStateModel>({
  name: 'project',
  defaults: {
    project: null,
    projects: [] as Project[],
    stats: {} as Stats,
  },
})

/**
 * 3. LA CLASSE STATE
 * Elle écoute les actions et délègue le travail au "Handler".
 */
export class ProjectState {
  constructor(
    private projectService: ProjectService, // Service API (injecté mais non utilisé ici directement)
    private projectHandler: ProjectHandler, // Le "cerveau" qui contient la logique métier
  ) {}

  /**
   * INTERCEPTEUR : Récupérer tous les projets
   * @Action(GetProjects) : Dit à NGXS d'exécuter cette méthode dès que l'action est lancée.
   */
  @Action(GetProjects)
  getAllProject(ctx: StateContext<ProjectStateModel>, action: GetProjects) {
    // Petit log utile pour le débogage en développement
    console.log('Action "Get All Projects" détectée : ', action, ctx);
    
    // On passe le relais au Handler pour effectuer l'appel API et mettre à jour le State
    this.projectHandler.getProjectsHandler(ctx, action);
  }

  /**
   * INTERCEPTEUR : Récupérer un projet spécifique
   */
  @Action(GetProject)
  getProject(ctx: StateContext<ProjectStateModel>, action: GetProject) {
    console.log('Action "Get Single Project" détectée : ', action, ctx);
    
    // On appelle la méthode du Handler dédiée à la récupération d'un seul projet
    this.projectHandler.getProjectHandler(ctx, action);
  }
}