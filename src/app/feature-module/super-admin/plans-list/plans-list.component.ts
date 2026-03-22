import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes, DataService } from 'src/app/core/core.index';
import { plansList, apiResultFormat } from 'src/app/core/models/models';
import {
  PaginationService,
  tablePageSize,
  pageSelection,
} from 'src/app/shared/sharedIndex';

@Component({
  selector: 'app-plans-list',
  templateUrl: './plans-list.component.html',
  styleUrl: './plans-list.component.scss',
  standalone: false
})
export class PlansListComponent {
  public routes = routes;
  // Stocke les données à afficher dans le tableau HTML
  public tableData: Array<plansList> = [];
  
  // --- Variables pour la gestion de la pagination ---
  public pageSize = 10;
  public serialNumberArray: Array<number> = []; // Pour générer les numéros de ligne (1, 2, 3...)
  public totalData = 0; // Nombre total d'éléments retournés par l'API
  showFilter = false; // Pour afficher/masquer les filtres dans l'UI
  
  // Source de données pour le tableau Angular Material
  dataSource!: MatTableDataSource<plansList>;

  constructor(
    private data: DataService,           // Service pour récupérer les données via HTTP
    private pagination: PaginationService, // Service partagé pour synchroniser la pagination
    private router: Router,
  ) {
    // S'abonne aux changements de page (quand l'utilisateur clique sur "Suivant" par exemple)
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      // Vérifie que l'on est bien sur la route "plans-list" avant de charger les données
      if (this.router.url == this.routes.plansList) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  /**
   * Récupère les données depuis le service et filtre les résultats pour la page actuelle
   */
  private getTableData(pageOption: pageSelection): void {
    this.data.getPlansList().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;

      // Parcours les données reçues et n'ajoute que celles correspondant à la page demandée
      apiRes.data.map((res: plansList, index: number) => {
        const serialNumber = index + 1;
        // Logique de découpage (skip = début de page, limit = fin de page)
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber; // Assigne le numéro de ligne à l'ID pour l'affichage
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });

      // Initialise ou met à jour la source de données Material
      this.dataSource = new MatTableDataSource<plansList>(this.tableData);
      
      // Envoie les infos de pagination au service partagé pour mettre à jour les boutons (Précédent/Suivant)
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        tableData2: [],
        serialNumberArray: this.serialNumberArray,
      });
    });
  }

  /**
   * Gère le tri des colonnes (ex: trier par prix ou par nom)
   */
  public sortData(sort: Sort) {
    const data = this.tableData.slice(); // Crée une copie pour ne pas muter l'original

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        // 'as never' permet d'accéder dynamiquement à la propriété sans erreur TypeScript
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        // Logique de tri croissant ou décroissant
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  // Gère l'affichage d'un volet de contenu (ex: filtres ou options)
  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}