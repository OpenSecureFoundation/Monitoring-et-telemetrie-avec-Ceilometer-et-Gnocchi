/**
 * Action pour déclencher la récupération de toutes les alertes.
 * Dans le pattern Redux/NGXS, une action sert de signal.
 */
export class GetAlerts {
  /**
   * Le 'type' est l'identifiant unique de l'action. 
   * Il apparaît dans les outils de débogage pour savoir ce qui se passe.
   * Format : [Contexte] Description de l'action
   */
  static readonly type = '[Alert] GetAlerts';

  /**
   * Le constructeur est vide ici car nous n'avons pas besoin de 
   * paramètres (comme un ID) pour récupérer TOUTES les alertes.
   */
  constructor() {}
}