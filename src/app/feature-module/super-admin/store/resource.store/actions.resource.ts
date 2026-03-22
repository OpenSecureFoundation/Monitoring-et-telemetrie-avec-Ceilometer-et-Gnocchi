/**
 * ACTION 1 : Récupérer les détails d'une ressource.
 * On l'utilise pour afficher la fiche d'identité d'un élément (nom, état, config).
 */
export class GetResource {
  // Identifiant unique de l'action pour le débogage (Redux DevTools).
  static readonly type = '[Resource] GetResource';

  /**
   * Le constructeur définit les paramètres obligatoires pour cette requête.
   * L'utilisation de 'public' crée automatiquement les propriétés dans la classe.
   */
  constructor(
    public projectId: string,    // ID du projet parent
    public resourceId: string,   // ID de la ressource spécifique
    public resourceType: string, // Type (ex: 'virtual_machine', 'database')
  ) {}
}

/**
 * ACTION 2 : Récupérer les mesures de performance (Métriques).
 * On l'utilise pour afficher des graphiques (CPU, RAM, Débit).
 */
export class GetMetric {
  static readonly type = '[Metric] GetMetric';

  constructor(
    public projectId: string,
    public resourceId: string,
    public resourceType: string, // Souvent nécessaire car les métriques diffèrent selon le type
  ) {}
}

/**
 * ACTION 3 : Récupérer les alarmes d'une ressource.
 * On l'utilise pour savoir si la ressource a des problèmes critiques.
 */
export class GetAlarm {
  static readonly type = '[Alarm] GetAlarm';

  constructor(
    public projectId: string,
    public resourceId: string,
    // Note : Ici, le type de ressource n'est pas demandé, 
    // l'ID semble suffire pour trouver les alarmes liées.
  ) {}
}