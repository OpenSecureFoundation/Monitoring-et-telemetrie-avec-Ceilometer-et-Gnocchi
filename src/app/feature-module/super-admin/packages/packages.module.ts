import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe les fonctionnalités de base d'Angular (ngIf, ngFor, etc.)

import { PackagesRoutingModule } from './packages-routing.module'; // Importe le système de navigation de ce module
import { PackagesComponent } from './packages.component'; // Importe le composant (logique + vue)
import { SharedModule } from 'src/app/shared/shared.module'; // Importe les composants réutilisables du projet


@NgModule({
  // 1. DECLARATIONS : On liste ici les composants qui appartiennent à ce module.
  // Chaque composant doit être déclaré dans un (et un seul) module.
  declarations: [
    PackagesComponent
  ],

  // 2. IMPORTS : On liste les autres modules dont ce module a besoin.
  imports: [
    CommonModule,            // Indispensable pour que le HTML reconnaisse les directives de base
    PackagesRoutingModule,   // Permet d'activer les routes définies pour les forfaits
    SharedModule             // Donne accès aux outils communs (boutons, spinners, tableaux personnalisés)
  ]
})
// On exporte la classe pour qu'elle puisse être utilisée ailleurs (souvent pour le Lazy Loading).
export class PackagesModule { }