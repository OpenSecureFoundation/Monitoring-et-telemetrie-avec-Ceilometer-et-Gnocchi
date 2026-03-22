import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseTransactionComponent } from './purchase-transaction.component';

// 1. DÉFINITION DE LA ROUTE
// On crée un tableau qui contient la configuration de navigation.
const routes: Routes = [
  { 
    // Un chemin vide ('') signifie que ce composant est le point d'entrée par défaut.
    // Dès que l'utilisateur accède au module "PurchaseTransaction", 
    // c'est ce composant qui s'affiche.
    path: '', 
    component: PurchaseTransactionComponent 
  }
];

@NgModule({
  // 2. ENREGISTREMENT DES ROUTES
  // On utilise .forChild(routes) car ce module est un module "fils".
  // Seul le module principal (AppModule) utilise .forRoot().
  // Cela permet à Angular de fusionner ces routes dans l'arbre de navigation global.
  imports: [RouterModule.forChild(routes)],
  
  // 3. EXPORTATION
  // On exporte le RouterModule pour que le composant puisse utiliser 
  // les directives de navigation (comme routerLink) dans son template HTML.
  exports: [RouterModule]
})
export class PurchaseTransactionRoutingModule { }