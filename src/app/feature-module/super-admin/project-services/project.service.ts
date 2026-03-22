import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

// Le décorateur @Injectable avec 'root' indique que ce service est disponible 
// dans toute l'application (Singleton). Angular gère son instanciation automatiquement.
@Injectable({ providedIn: 'root' })
export class ProjectService {
  
  // On injecte le client HttpClient pour pouvoir envoyer des requêtes au backend.
  constructor(private http: HttpClient) {}

  /**
   * Récupère la liste complète de tous les projets.
   * Utilise l'URL de base définie dans le fichier d'environnement.
   * @returns Un Observable contenant un tableau de projets.
   */
  getProjects(): Observable<any> {
    // On construit l'URL finale : ex: "https://api.monsite.com/projects"
    return this.http.get<any>(`${environment.url}/projects`);
  }

  /**
   * Récupère les détails (vue d'ensemble) d'un projet spécifique.
   * @param projectId L'identifiant unique du projet à récupérer.
   */
  getProject(projectId: string): Observable<any> {
    // Utilisation des "template literals" (``) pour insérer l'ID directement dans l'URL.
    // ex: "https://api.monsite.com/projects/123/overview"
    return this.http.get<any>(
      `${environment.url}/projects/${projectId}/overview`,
    );
  }
}
