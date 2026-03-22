import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes, DataService } from 'src/app/core/core.index';
import {
  domainRequest,
  pageSelection,
  apiResultFormat,
} from 'src/app/core/models/models';
import { PaginationService, tablePageSize } from 'src/app/shared/sharedIndex';

@Component({
  selector: 'app-domain-request',
  templateUrl: './domain-request.component.html',
  styleUrls: ['./domain-request.component.scss'],
  standalone: false
})
export class DomainRequestComponent {
  public routes = routes;
  // Stocke les données affichées dans le tableau
  public tableData: Array<domainRequest> = [];
  
  // --- Variables de Pagination ---
  public pageSize = 10;
  public serialNumberArray: Array<number> = []; // Pour les numéros de ligne (1, 2, 3...)
  public totalData = 0;
  public searchDataValue = '';
  // Source de données pour le composant Table d'Angular Material
  dataSource!: MatTableDataSource<domainRequest>;
  
  showFilter = false;

  constructor(
    private data: DataService, // Service pour appeler l'API
    private pagination: PaginationService, // Service commun pour gérer les pages
    private router: Router,
  ) {
    // Écoute les changements de page (clic sur suivant/précédent)
    this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
      // On vérifie que l'utilisateur est bien sur la route "domainRequest"
      if (this.router.url == this.routes.domainRequest) {
        this.getTableData({ skip: res.skip, limit: res.limit });
        this.pageSize = res.pageSize;
      }
    });
  }

  /**
   * Récupère les données depuis le service et gère le découpage par page
   */
  private getTableData(pageOption: pageSelection): void {
    this.data.getDomainRequest().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;

      // Filtrage manuel des données pour ne garder que celles de la page actuelle
      apiRes.data.map((res: domainRequest, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });

      // Met à jour la source de données du tableau Material
      this.dataSource = new MatTableDataSource<domainRequest>(this.tableData);
      
      // Informe le service de pagination des nouveaux calculs
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
   * Gère le tri des colonnes (ex: trier par nom ou par date)
   */
  public sortData(sort: Sort) {
    const data = this.tableData.slice(); // Copie des données

    if (!sort.active || sort.direction === '') {
      this.tableData = data;
    } else {
      this.tableData = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        // Compare les valeurs selon la direction (ascendant ou descendant)
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  // --- Gestion de l'interface (UI) ---
  isCollapsed1 = false;
  isCollapsed2 = false;

  // Données de test pour les filtres latéraux
  users = [
    { name: 'Sumo Soft Limited', checked: false },
    { name: 'Repair Group Co', checked: false },
  ];
  
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }

  public toggleData = false;
  openContent() {
    this.toggleData = !this.toggleData;
  }
}