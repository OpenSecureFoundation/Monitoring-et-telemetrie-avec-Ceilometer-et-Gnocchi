/**
 * ACTION 1 : Récupérer TOUS les projets.
 * On utilise généralement cette action pour charger une liste ou un tableau de bord.
 */
export class GetProjects {
  /**
   * Le 'type' est l'identifiant unique de l'action. 
   * Le format "[Catégorie] Description" est une convention NGXS pour 
   * faciliter le débogage dans les Redux DevTools.
   */
  static readonly type = '[Project] GetProjects';
  /**
   * Le constructeur est vide car nous n'avons pas besoin d'informations 
   * supplémentaires pour demander "la liste complète".
   */
  constructor() {}
}

/**
 * ACTION 2 : Récupérer UN projet spécifique.
 * On utilise cette action quand l'utilisateur clique sur un projet précis 
 * pour voir ses détails ou sa vue d'ensemble.
 */
export class GetProject {
  // Identifiant unique différent de la première action.
  static readonly type = '[Project] GetProject';
  /**
   * Le constructeur accepte un paramètre : projectId.
   * L'utilisation du mot-clé 'public' dans le constructeur crée 
   * automatiquement une propriété dans la classe accessible par le State.
   */
  constructor(public projectId: string) {}
}
