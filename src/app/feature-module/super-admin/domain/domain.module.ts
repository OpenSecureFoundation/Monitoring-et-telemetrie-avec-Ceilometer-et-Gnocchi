import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe les outils de base d'Angular (comme ngIf et ngFor)

import { DomainRoutingModule } from './domain-routing.module'; // Importe la gestion des routes pour ce module
import { DomainComponent } from './domain.component'; // Importe le composant principal (le cerveau)
import { SharedModule } from 'src/app/shared/shared.module'; // Importe les outils partagés (boutons, spinners, etc.)

@NgModule({
  // 1. DECLARATIONS : On liste ici les composants, pipes ou directives 
  // qui appartiennent EXCLUSIVEMENT à ce module.
  declarations: [
    DomainComponent
  ],

  // 2. IMPORTS : On liste ici les autres modules dont les composants 
  // déclarés ci-dessus ont besoin pour fonctionner.
  imports: [
    CommonModule,          // Obligatoire pour utiliser les directives de base dans le HTML
    DomainRoutingModule,    // Pour que le module sache comment naviguer
    SharedModule           // Pour réutiliser les composants globaux de ton application
  ]
})
// Le décorateur @NgModule transforme cette simple classe TypeScript en un module Angular.
export class DomainModule { }