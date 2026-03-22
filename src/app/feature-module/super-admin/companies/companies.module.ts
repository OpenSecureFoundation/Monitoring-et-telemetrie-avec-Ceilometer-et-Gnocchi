import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe les directives de base d'Angular (ex: ngIf, ngFor)

import { CompaniesRoutingModule } from './companies-routing.module'; // Importe la configuration des routes
import { CompaniesComponent } from './companies.component'; // Importe le composant principal de ce module
import { SharedModule } from 'src/app/shared/shared.module'; // Importe les composants réutilisables (boutons, spinners, etc.)

@NgModule({
  // 1. DECLARATIONS : On liste les composants qui appartiennent UNIQUEMENT à ce module.
  // Un composant ne peut être déclaré que dans un seul module à la fois.
  declarations: [
    CompaniesComponent
  ],

  // 2. IMPORTS : On liste les autres modules dont notre CompaniesComponent a besoin pour fonctionner.
  imports: [
    CommonModule,           // Pour utiliser les pipes (date, number) et directives (ngIf) dans le HTML
    CompaniesRoutingModule, // Pour activer la navigation (les routes) définie précédemment
    SharedModule            // Pour accéder aux outils communs (probablement des composants de UI)
  ]
})
export class CompaniesModule { }