import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importe les directives de base (comme ngIf et ngFor)

import { PurchaseTransactionRoutingModule } from './purchase-transaction-routing.module'; // Gère la navigation
import { PurchaseTransactionComponent } from './purchase-transaction.component'; // Le composant de la vue
import { SharedModule } from 'src/app/shared/shared.module'; // Importe les composants et outils partagés


@NgModule({
  // 1. DECLARATIONS : On liste ici les composants qui "vivent" dans ce module.
  // Un composant ne peut appartenir qu'à UN SEUL module à la fois.
  declarations: [
    PurchaseTransactionComponent
  ],

  // 2. IMPORTS : On liste les autres modules dont ce module a besoin pour fonctionner.
  imports: [
    CommonModule,                    // Nécessaire pour que le HTML comprenne les directives de base d'Angular
    PurchaseTransactionRoutingModule, // Active la configuration des routes pour ce module
    SharedModule                     // Donne accès aux boutons, tableaux ou pipes réutilisables
  ]
})
// On exporte la classe pour qu'elle puisse être chargée (souvent via Lazy Loading)
export class PurchaseTransactionModule { }