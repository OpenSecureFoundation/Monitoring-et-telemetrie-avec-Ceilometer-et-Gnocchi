import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

// Le décorateur @Injectable permet à Angular d'injecter ce service là où on en a besoin.
// 'providedIn: root' signifie qu'une seule instance du service existe pour toute l'application.
@Injectable({ providedIn: 'root' })
export class ResourceService {
  
  // Injection du HttpClient pour envoyer des requêtes réseau.
  constructor(private http: HttpClient) {}

  /**
   * Récupère la vue d'ensemble (overview) d'une ressource spécifique.
   * On utilise POST car on doit envoyer le 'resourceType' dans le corps (body) de la requête.
   */
  getResource(
    projectId: string,
    resourceId: string,
    resourceType: string,
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/project/${projectId}/resource/${resourceId}/overview`,
      { resourceType: resourceType }, // Corps de la requête (Body)
    );
  }

  /**
   * Récupère les métriques (données de performance comme CPU, RAM) d'une ressource.
   * Également en POST pour transmettre le type de ressource.
   */
  getMetric(
    projectId: string,
    resourceId: string,
    resourceType: string,
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.url}/project/${projectId}/resource/${resourceId}/metric`,
      { resourceType: resourceType },
    );
  }

  /**
   * Récupère la liste des alarmes/alertes liées à une ressource précise.
   * Ici, c'est une requête GET classique car aucun corps de message n'est requis.
   */
  getAlarms(projectId: string, resourceId: string): Observable<any> {
    return this.http.get<any>(
      `${environment.url}/project/${projectId}/resource/${resourceId}/alarms`,
    );
  }
}