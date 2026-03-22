import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

// Le décorateur @Injectable avec 'root' signifie que ce service est un "Singleton".
// Il est disponible partout dans l'application et il n'y aura qu'une seule instance créée.
@Injectable({ providedIn: 'root' })
export class AodhService {
  
  // On injecte le client HTTP d'Angular pour pouvoir effectuer des requêtes (GET, POST, etc.)
  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste des alertes (alarmes) depuis le serveur.
   * @returns Un Observable qui émettra les données une fois la réponse reçue.
   */
  getAlerts(): Observable<any> {
    // On utilise les "backticks" (`) pour construire l'URL dynamiquement.
    // 'environment.url' permet de basculer automatiquement entre l'adresse locale (développement)
    // et l'adresse du serveur réel (production).
    return this.http.get<any>(`${environment.url}/alarms`);
  }
}
