import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainRequestComponent } from './domain-request.component';

// 1. DÉFINITION DES ROUTES
// On crée un tableau qui associe une URL à un composant.
const routes: Routes = [
  { 
    // Un chemin vide ('') signifie que ce composant est le composant "par défaut" 
    // qui s'affichera dès que l'utilisateur entrera dans ce module.
    path: '', 
    component: DomainRequestComponent 
  }
];

@NgModule({
  // 2. ENREGISTREMENT DES ROUTES
  // On utilise 'forChild' car ce sont des routes de second niveau (module enfant).
  // 'forRoot' est réservé uniquement au module principal de l'application (AppModule).
  imports: [RouterModule.forChild(routes)],
  
  // 3. EXPORTATION
  // On ré-exporte le RouterModule pour que les directives comme [routerLink]
  // soient disponibles dans les fichiers HTML de ce module.
  exports: [RouterModule]
})
export class DomainRequestRoutingModule { }