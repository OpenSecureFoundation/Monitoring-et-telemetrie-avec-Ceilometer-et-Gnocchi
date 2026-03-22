import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';

/**
 * 1. DÉFINITION DES ROUTES
 * C'est un tableau qui fait correspondre une URL à un Composant.
 */
const routes: Routes = [
  { 
    path: '', // Le chemin est vide ici car il est relatif au module parent.
    component: SubscriptionComponent // Quand l'utilisateur arrive sur cette route, on affiche ce composant.
  }
];

@NgModule({
  /**
   * 2. CONFIGURATION DU ROUTAGE
   * 'forChild(routes)' indique que ces routes sont des routes "filles".
   * On utilise 'forChild' dans les modules de fonctionnalités (Lazy Loading) 
   * et 'forRoot' uniquement dans le module principal (AppModule).
   */
  imports: [RouterModule.forChild(routes)],
  
  /**
   * 3. EXPORTATION
   * On ré-exporte le RouterModule pour que le module principal (SubscriptionModule) 
   * puisse utiliser les directives de navigation comme <router-outlet> ou routerLink.
   */
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }