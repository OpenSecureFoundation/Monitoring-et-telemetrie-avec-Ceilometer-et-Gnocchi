import { ProjectSelector } from '../store/project.store/selectors.projects';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SpinnerService } from 'src/app/core/core.index';

import { GetProjects } from '../store/project.store/actions.projects';
import { Observable } from 'rxjs';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  standalone: false,
})
export class SubscriptionComponent implements OnInit {
  // Déclarations des Observables (flux de données en temps réel provenant du Store)
  allProject$!: Observable<any[]>; // Liste brute des projets
  stat$!: Observable<any>;         // Statistiques des projets

  // Variables locales pour la gestion de l'affichage
  filteredProjects: any[] = [];    // La liste qui sera réellement affichée (après filtrage)
  currentFilter: 'all' | 'active' | 'inactive' = 'all'; // État du filtre actuel

  constructor(
    private router: Router,
    private store: Store,              // Accès au Store NGXS
    public spinnerService: SpinnerService, // Service pour gérer l'affichage du chargement
  ) {}

  ngOnInit(): void {
    // 1. DÉCLENCHEMENT : On demande au Store d'aller chercher les projets (appel API via le Handler)
    this.store.dispatch(new GetProjects());

    // 2. SÉLECTION : On "branche" nos variables sur les sélecteurs du Store
    this.allProject$ = this.store.select(ProjectSelector.getProjects);
    this.stat$ = this.store.select(ProjectSelector.getStat);

    // 3. ÉCOUTE : Dès que les projets arrivent ou changent dans le Store...
    this.allProject$.subscribe((projects) => {
      console.log('Projets reçus du Store : ', projects);
      // On rafraîchit la liste filtrée
      this.filterProjects(this.currentFilter);
    });

    this.stat$.subscribe((stat) => {
      console.log('Statistiques reçues : ', stat);
    });
  }

  /**
   * Filtre la liste des projets selon leur statut (activé ou non)
   * @param filter 'all' | 'active' | 'inactive'
   */
  filterProjects(filter: 'all' | 'active' | 'inactive'): void {
    this.currentFilter = filter;

    // On récupère la valeur actuelle de l'observable pour appliquer le filtre
    this.allProject$.subscribe((projects) => {
      if (!projects) return; // Sécurité si la liste est vide

      switch (filter) {
        case 'active':
          // On ne garde que les projets où 'enabled' est vrai
          this.filteredProjects = projects.filter((p: any) => p.enabled);
          break;
        case 'inactive':
          // On ne garde que les projets où 'enabled' est faux
          this.filteredProjects = projects.filter((p: any) => !p.enabled);
          break;
        case 'all':
        default:
          this.filteredProjects = projects;
          break;
      }
    });
  }

  /**
   * Redirige l'utilisateur vers la page de détails d'une entreprise/projet
   */
  viewProject(project: any): void {
    console.log('Navigation vers le projet :', project.id);
    // Utilise les routes centralisées pour construire l'URL (ex: /companies/123)
    this.router.navigateByUrl(`${routes.companies}/${project.id}`);
  }

  /**
   * Logique pour modifier un projet
   */
  editProject(project: any): void {
    console.log('Édition demandée pour :', project.name);
    // À implémenter : généralement l'ouverture d'un formulaire
  }

  /**
   * Logique pour supprimer un projet
   */
  deleteProject(project: any): void {
    console.log('Suppression demandée pour :', project.name);
    // À implémenter : appel à une action 'DeleteProject' après confirmation
  }

  /**
   * Gère le tri des colonnes (si un tableau MatTable est utilisé)
   */
  sortData(event: any): void {
    console.log('Tri demandé :', event);
    // Logique de tri à implémenter selon la colonne cliquée
  }
}