import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainComponent } from './domain.component';

// 1. CONFIGURATION DES ROUTES
const routes: Routes = [
  { 
    // Ici, le path est VIDE ('')
    // Cela signifie que le composant DomainComponent s'affichera par défaut
    // dès que l'utilisateur arrive sur le préfixe de ce module.
    path: '', 
    component: DomainComponent 
  }
];

@NgModule({
  // 2. ENREGISTREMENT DES ROUTES
  // On utilise .forChild() car ce module est "scellé" à l'intérieur d'un module parent
  imports: [RouterModule.forChild(routes)],
  
  // 3. EXPORTATION
  // On rend le RouterModule disponible pour que les directives comme [routerLink]
  // fonctionnent dans les templates HTML du domaine.
  exports: [RouterModule]
})
export class DomainRoutingModule { }