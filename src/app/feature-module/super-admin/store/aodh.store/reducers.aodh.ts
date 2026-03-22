import { Injectable } from '@angular/core';
import { StateContext } from '@ngxs/store';
import { AodhStateModel } from './state.aodh';
import { GetAlerts } from './actions.aodh';
import { AodhService } from '../../project-services/aodh.service';

// Le décorateur @Injectable permet d'utiliser ce gestionnaire partout dans l'application.
@Injectable({ providedIn: 'root' })
export class AodhHandler {
  // On injecte le service AodhService pour pouvoir appeler l'API réelle.
  constructor(private aodhService: AodhService) {}

  /**
   * Cette méthode est le "cerveau" qui s'exécute quand l'action GetAlerts est lancée.
   * @param context L'outil qui permet de lire ou de modifier l'état actuel (State).
   * @param action L'instance de l'action déclenchée (ici GetAlerts).
   */
  getAllAlertsHandler(
    context: StateContext<AodhStateModel>,
    action: GetAlerts,
  ) {
    // 1. On récupère une copie de l'état actuel (les données déjà présentes en mémoire).
    const state = context.getState();

    // 2. On appelle le service pour récupérer les alertes via HTTP.
    this.aodhService.getAlerts().subscribe((res) => {
      // 3. Si on reçoit une réponse valide du serveur...
      if (res) {
        console.log('res: ', res);

        // 4. On met à jour le State (la mémoire globale de l'app).
        // On utilise 'setState' pour remplacer les anciennes données par les nouvelles.
        context.setState({
          ...state,           // On garde les propriétés existantes (copie superficielle).
          alerts: res.alerts,  // On enregistre les nouvelles alertes.
          stats: res.stats,    // On enregistre les statistiques reçues.
          projects: res.projectMap, // On enregistre la carte des projets.
        });
      }
    });
  }
}