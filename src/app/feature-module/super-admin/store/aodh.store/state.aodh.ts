import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Alert } from '../../models/alert';
import { GetAlerts } from './actions.aodh';
import { AodhHandler } from './reducers.aodh';

/**
 * 1. DÉFINITION DU MODÈLE (INTERFACE)
 * C'est le "plan" de tes données en mémoire. 
 * On définit exactement ce que le State va stocker.
 */
export interface AodhStateModel {
  alerts: Alert[]; // Un tableau d'objets Alert
  stats: any;      // Statistiques globales
  projects: any;   // Données liées aux projets
}

@Injectable({ providedIn: 'root' })
/**
 * 2. DÉCORATEUR @State
 * Il transforme cette classe en un "magasin de données" pour NGXS.
 * - name : le nom unique utilisé pour retrouver ce state dans le store global.
 * - defaults : les valeurs initiales (état vide) au démarrage de l'app.
 */
@State<AodhStateModel>({
  name: 'aodh',
  defaults: {
    alerts: [] as Alert[],
    stats: {} as any,
    projects: null,
  },
})

/**
 * 3. LA CLASSE STATE
 * C'est ici que l'on réceptionne les actions pour modifier les données.
 */
export class AodhState {
  // On injecte le "Handler" qui contient la logique complexe de calcul ou d'appel API.
  constructor(private aodhHandler: AodhHandler) {}

  /**
   * 4. DÉCORATEUR @Action
   * Cette fonction s'exécute automatiquement dès que l'action 'GetAlerts' 
   * est envoyée (dispatchée) par un composant.
   * * @param ctx : Le contexte qui permet de lire/modifier l'état actuel.
   * @param action : L'instance de l'action reçue (peut contenir des paramètres).
   */
  @Action(GetAlerts)
  getAllAlerts(ctx: StateContext<AodhStateModel>, action: GetAlerts) {
    // Log de débogage pour voir quand l'action passe dans le circuit.
    console.log('Get all alerts action dispatched: ', action, ctx);
    
    // On délègue le travail réel au 'Handler' pour garder cette classe propre.
    // C'est le Handler qui fera l'appel API et le ctx.setState().
    this.aodhHandler.getAllAlertsHandler(ctx, action);
  }
}