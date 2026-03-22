import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe les fonctionnalités de base (ngIf, ngFor, etc.)

import { DomainRequestRoutingModule } from './domain-request-routing.module'; // Le système de navigation propre à ce module
import { DomainRequestComponent } from './domain-request.component'; // Le composant visuel principal
import { SharedModule } from 'src/app/shared/shared.module'; // Importe les outils réutilisables de ton projet


@NgModule({
  // 1. DECLARATIONS : On liste ici les composants qui appartiennent à ce module.
  // Un composant ne peut être déclaré que dans UN SEUL module à la fois.
  declarations: [
    DomainRequestComponent
  ],

  // 2. IMPORTS : On liste les autres modules dont nous avons besoin pour que nos composants fonctionnent.
  imports: [
    CommonModule,               // Pour utiliser les pipes et les directives de base d'Angular
    DomainRequestRoutingModule,  // Pour activer les routes définies pour cette fonctionnalité
    SharedModule                // Pour accéder aux composants communs (ex: boutons, spinners, tableaux)
  ]
})
// La classe est exportée pour pouvoir être chargée (souvent en "Lazy Loading") par le module principal.
export class DomainRequestModule { }