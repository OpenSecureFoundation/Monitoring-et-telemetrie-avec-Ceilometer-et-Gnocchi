import { Injectable } from '@angular/core';
import { ResourceService } from '../../project-services/resource.service';
import { StateContext } from '@ngxs/store';
import { ResourceStateModel } from './state.resource';
import { GetResource, GetMetric, GetAlarm } from './actions.resource';

@Injectable({ providedIn: 'root' })
export class ResourceHandler {
  // On injecte le service qui fait les appels HTTP réels vers le serveur
  constructor(private resourceService: ResourceService) {}

  /**
   * Gère la récupération des informations de base d'une ressource.
   */
  getResource(context: StateContext<ResourceStateModel>, action: GetResource) {
    // 1. On récupère l'état actuel (pour ne pas écraser les autres données comme 'alarms')
    const ctx = context.getState();

    // 2. Appel API en utilisant les paramètres transportés par l'action (ID, Projet, Type)
    this.resourceService
      .getResource(action.projectId, action.resourceId, action.resourceType)
      .subscribe((response) => {
        if (response) {
          console.log('Réponse ressource reçue : ', response);
          
          // 3. Mise à jour de l'état avec les détails et les mini-métriques
          context.setState({
            ...ctx,                     // Copie de l'ancien état
            resource: response.resource, // Nouvelles données de la ressource
            miniMetric: response.miniMetric, // Petites stats de performance
          });
        }
      });
  }

  /**
   * Gère la récupération des séries temporelles (graphiques de performance).
   */
  getMetric(context: StateContext<ResourceStateModel>, payload: GetMetric) {
    const ctx = context.getState();
    
    this.resourceService
      .getMetric(payload.projectId, payload.resourceId, payload.resourceType)
      .subscribe((response) => {
        if (response) {
          console.log('Données métriques reçues : ', response);
          
          context.setState({
            ...ctx,
            // 'timeSerie' stocke les données pour afficher des graphiques (Evolution CPU/RAM)
            timeSerie: response.timeSeries, 
          });
        }
      });
  }

  /**
   * Gère la récupération de la liste des alarmes pour cette ressource.
   */
  getAlarms(context: StateContext<ResourceStateModel>, payload: GetAlarm) {
    const ctx = context.getState();

    this.resourceService
      .getAlarms(payload.projectId, payload.resourceId)
      .subscribe((res) => {
        if (res) {
          console.log('Liste des alarmes reçue : ', res);
          
          context.setState({
            ...ctx,
            alarms: res.alarms, // Met à jour uniquement la liste des alertes
          });
        }
      });
  }
}