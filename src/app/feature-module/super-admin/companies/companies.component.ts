import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetProject } from '../store/project.store/actions.projects';
import { ProjectSelector } from '../store/project.store/selectors.projects';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from 'src/app/core/core.index';

//code utilise Angular combiné à NGXS (pour la gestion d'état/Store). 
// En gros, ce composant récupère un ID depuis l'URL, demande au Store 
// de charger les données correspondantes, et gère l'affichage (onglets, couleurs de status, etc.).
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
  standalone: false,
})
export class CompaniesComponent implements OnInit {
  // Propriétés pour stocker l'ID et l'Observable du projet
  projectId!: string;
  project$!: Observable<any>; // Le '$' est une convention pour dire que c'est un flux (Observable)

  // Gestion de l'onglet actif (par défaut 'dashboard')
  activeTab: string = 'dashboard';

  constructor(
    private route: ActivatedRoute,    // Pour lire les paramètres de l'URL
    private store: Store,             // Pour interagir avec le State (NGXS)
    public spinnerService: SpinnerService, // Service pour gérer l'affichage de chargement
  ) {}

  ngOnInit(): void {
    // 1. RÉCUPÉRATION DE L'ID : On écoute les changements de paramètres dans l'URL
    this.route.params.subscribe((params: any) => {
      this.projectId = params['id'];
      console.log('ID récupéré :', this.projectId);
    });

    // 2. ACTION : On demande au Store d'aller chercher le projet avec cet ID
    this.store.dispatch(new GetProject(this.projectId));

    // 3. SÉLECTION : On lie notre variable project$ aux données du Store via un Selector
    this.project$ = this.store.select(ProjectSelector.getProject);

    // 4. OBSERVATION : (Debug) On regarde ce que le projet contient quand il change
    this.project$.subscribe((project) => {
      console.log('Données du projet reçues : ', project);
    });

    // 5. SURVEILLANCE : Utilisation de 'tap' pour faire des effets secondaires (logs/alertes) sans modifier la donnée
    this.project$
      .pipe(
        tap((valeur) => {
          if (valeur === undefined) {
            console.warn('Attention : Le projet est introuvable (undefined) !');
          }
        }),
      )
      .subscribe();
  }

  /**
   * Change l'onglet actif et manipule le DOM pour l'affichage
   * Note : En Angular pur, on préfère souvent utiliser [ngClass] dans le HTML plutôt que document.querySelectorAll
   */
  switchTab(tabName: string): void {
    this.activeTab = tabName;

    // Gestion visuelle des boutons (ajout/suppression de la classe 'active')
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((btn) => {
      btn.getAttribute('data-tab') === tabName 
        ? btn.classList.add('active') 
        : btn.classList.remove('active');
    });

    // Gestion visuelle des contenus d'onglets
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach((pane) => {
      if (pane.id === tabName) {
        pane.classList.add('active');
        (pane as HTMLElement).style.display = 'block';
      } else {
        pane.classList.remove('active');
        (pane as HTMLElement).style.display = 'none';
      }
    });
  }

  /**
   * Copie l'ID du projet dans le presse-papier de l'utilisateur
   */
  copyProjectId(): void {
    navigator.clipboard.writeText(this.projectId).then(() => {
      console.log('ID copié !');
    });
  }

  /**
   * Retourne une classe CSS selon le statut (vert pour active, rouge pour suspendu)
   */
  getStatusClass(status: string): string {
    return status === 'active' ? 'active' : 'suspended';
  }

  /**
   * Détermine la couleur de l'alerte CPU selon le pourcentage d'usage
   */
  getCpuClass(usage: number): string {
    if (usage >= 90) return 'danger';  // Rouge
    if (usage >= 70) return 'warning'; // Orange
    return '';                         // Normal
  }

  /**
   * Calcule le pourcentage d'utilisation du stockage
   * Utilise l'optional chaining (?.) pour éviter de planter si les données sont absentes
   */
  getStorageUsagePercent(project: any): number {
    const used = project?.quotas?.storage?.volumes?.used ?? 0;
    const limit = project?.quotas?.storage?.volumes?.limit ?? 0;

    if (limit === 0) return 0;
    return Math.round((used / limit) * 100);
  }
}