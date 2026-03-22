import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  /**
   * 1. DECLARATIONS
   * On liste ici les composants qui APPARTIENNENT à ce module.
   * SubscriptionComponent ne peut être déclaré que dans UN SEUL module.
   */
  declarations: [
    SubscriptionComponent
  ],

  /**
   * 2. IMPORTS
   * On liste ici les outils EXTÉRIEURS dont ce module a besoin pour fonctionner.
   */
  imports: [
    CommonModule,              // Fournit les directives de base comme *ngIf et *ngFor.
    SubscriptionRoutingModule, // Gère les routes (URLs) spécifiques à ce module.
    SharedModule               // Importe tes composants réutilisables (boutons, spinners, modales, etc.).
  ]
})
/**
 * 3. LA CLASSE DU MODULE
 * C'est le point d'entrée que l'application chargera pour cette fonctionnalité.
 */
export class SubscriptionModule { }