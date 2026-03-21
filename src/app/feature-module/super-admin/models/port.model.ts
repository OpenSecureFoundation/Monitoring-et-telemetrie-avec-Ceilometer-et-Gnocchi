/**
 * Représente un port réseau attaché à l'instance.
 * Renvoyé par le 1er appel API (liste des ports).
 */
export interface InstancePort {
  // Champs bruts retournés par l'API OpenStack
  id: string;
  name: string; // peut être "" → afficher l'id tronqué en fallback
  mac_address: string;
  fixed_ips: { ip_address: string; subnet_id: string }[];
  network_id: string;
  status: string; // "ACTIVE" | "DOWN" | "BUILD" | "ERROR"
  admin_state_up: boolean;
  device_owner: string;
  // Statistiques cumulatives — renseignées par le 2ème appel API (métriques du port)
  // Absentes de la liste de ports, initialisées à 0
  rxBytes: number;
  txBytes: number;
  rxDropped: number;
  txErrors: number;
}
