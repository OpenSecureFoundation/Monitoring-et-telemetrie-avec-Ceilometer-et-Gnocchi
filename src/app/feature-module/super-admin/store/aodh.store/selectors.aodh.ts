import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { AodhState } from './state.aodh';
import { AodhStateModel } from './state.aodh';

// Le décorateur @Injectable permet à Angular de gérer cette classe, 
// bien que les méthodes soient statiques.

@Injectable({ providedIn: 'root' })
export class AodhSelector {
  constructor() {}

  /**
   * Extrait uniquement la liste des alertes du State global.
   * @Selector([AodhState]) : Indique à NGXS de surveiller le State "Aodh".
   * 'static' : Permet d'appeler la méthode sans instancier la classe.
   */

  @Selector([AodhState])
  static getAlerts(state: AodhStateModel) {
    return state.alerts;
  }

  /**
   * Extrait uniquement l'objet contenant les statistiques.
   * Si 'stats' change dans le State, tous les composants utilisant ce 
   * sélecteur seront automatiquement mis à jour.
   */
  @Selector([AodhState])
  static getStats(state: AodhStateModel) {
    return state.stats;
  }

  /**
   * Extrait la liste ou la map des projets liée aux alertes.
   */
  
  @Selector([AodhState])
  static getProjects(state: AodhStateModel) {
    return state.projects;
  }
}
