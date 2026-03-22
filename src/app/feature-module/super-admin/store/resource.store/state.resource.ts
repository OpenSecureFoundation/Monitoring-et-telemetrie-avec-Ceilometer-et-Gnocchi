import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

/**
 * 1. LE MODÈLE D'ÉTAT (INTERFACE)
 * On définit ici la "forme" de nos données. 
 * C'est le contrat qui dit ce que l'application peut stocker pour une ressource.
 */
export interface ResourceStateModel {
  resource: any;    // Détails généraux (nom, statut, configuration)
  miniMetric: any;  // Résumé rapide des performances (ex: % actuel CPU)
  timeSerie: any;   // Historique des données pour les graphiques (évolution dans le temps)
  alarms: any;      // Liste des alertes liées à cette ressource
}

@Injectable({ providedIn: 'root' })
/**
 * 2. DÉCORATEUR @State
 * C'est ici que la magie NGXS opère.
 * - 'name' : C'est l'identifiant unique dans le store global (on y accède via 'state.resource').
 * - 'defaults' : On initialise tout à 'null' pour éviter les erreurs de lecture au démarrage.
 */
@State<ResourceStateModel>({
  name: 'resource',
  defaults: {
    resource: null,
    miniMetric: null,
    timeSerie: null,
    alarms: null,
  },
})

/**
 * 3. LA CLASSE STATE
 * Pour l'instant, elle est vide, mais c'est ici que tu ajouteras les méthodes 
 * @Action pour modifier les données ci-dessus (via ton ResourceHandler).
 */
export class ResourceState {
  constructor() {}
}