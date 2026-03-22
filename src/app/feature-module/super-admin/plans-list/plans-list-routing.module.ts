import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlansListComponent } from './plans-list.component';

// 1. DÉFINITION DE LA ROUTE
// On crée un tableau de configuration des routes.
const routes: Routes = [
  { 
    // 'path: ""' signifie que ce composant est le composant par défaut du module.
    // Si ce module est chargé sur "/plans", alors PlansListComponent s'affichera sur "/plans".
    path: '', 
    component: PlansListComponent 
  }
];

@NgModule({
  // 2. ENREGISTREMENT DES ROUTES
  // On utilise 'forChild' car ces routes sont rattachées à un module enfant (Feature Module).
  // La méthode 'forRoot' est réservée uniquement au module principal (AppModule).
  imports: [RouterModule.forChild(routes)],
  
  // 3. RÉ-EXPORTATION
  // On exporte le RouterModule pour que le composant PlansListComponent puisse utiliser 
  // les directives de navigation comme [routerLink] dans son fichier HTML.
  exports: [RouterModule]
})
export class PlansListRoutingModule { }