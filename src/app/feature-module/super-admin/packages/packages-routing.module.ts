import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackagesComponent } from './packages.component';

// 1. DÉFINITION DE LA ROUTE
// On crée un tableau de routes. Ici, on définit que le chemin vide ('')
// correspond au composant PackagesComponent.
const routes: Routes = [
  { 
    path: '', 
    component: PackagesComponent 
  }
];

@NgModule({
  // 2. ENREGISTREMENT DES ROUTES
  // On utilise .forChild() parce que ce module est chargé par un module parent.
  // Cela permet d'ajouter ces routes à l'arbre de navigation principal d'Angular.
  imports: [RouterModule.forChild(routes)],
  
  // 3. EXPORTATION
  // On exporte le RouterModule pour que le composant PackagesComponent
  // puisse utiliser les liens de navigation (routerLink) dans son HTML.
  exports: [RouterModule]
})
export class PackagesRoutingModule { }