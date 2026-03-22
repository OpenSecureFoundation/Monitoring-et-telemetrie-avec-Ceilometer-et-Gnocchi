import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { ResourceState, ResourceStateModel } from './state.resource';

@Injectable({ providedIn: 'root' })
export class ResourceSelector {
  constructor() {}

  /**
   * Sélecteur pour les informations générales de la ressource.
   * Il combine deux propriétés du state en un seul objet.
   * @returns Un objet contenant les détails (resource) et les petites stats (miniMetric).
   */
  @Selector([ResourceState])
  static getResource(state: ResourceStateModel) {
    return {
      resource: state.resource,
      miniMetric: state.miniMetric,
    };
  }

  /**
   * Sélecteur pour les données temporelles (graphiques).
   * @returns Un tableau ou un objet contenant l'historique des performances (CPU, RAM, etc.).
   */
  @Selector([ResourceState])
  static getTimeSerie(state: ResourceStateModel) {
    return state.timeSerie;
  }

  /**
   * Sélecteur pour la liste des alarmes.
   * @returns Le tableau des alertes/alarmes liées à cette ressource.
   */
  @Selector([ResourceState])
  static getAlarm(state: ResourceStateModel) {
    return state.alarms;
  }
}