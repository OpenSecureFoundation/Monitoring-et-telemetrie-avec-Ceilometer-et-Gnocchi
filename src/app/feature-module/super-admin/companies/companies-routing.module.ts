import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Importe les outils de navigation d'Angular
import { CompaniesComponent } from './companies.component'; // Importe le composant à afficher

// 1. DÉFINITION DES ROUTES
// On crée un tableau qui liste les correspondances entre URL et Composants
const routes: Routes = [
  {
    // ':id' est un paramètre dynamique (une variable dans l'URL)
    // Exemple : si l'URL est /123, alors id = 123
    path: ':id', 
    
    // Définit quel composant doit s'afficher quand on accède à ce chemin
    component: CompaniesComponent,
  },
];

// 2. CONFIGURATION DU MODULE
@NgModule({
  // .forChild(routes) indique que ce sont des routes secondaires (chargées par un module parent)
  // Cela permet de faire du "Lazy Loading" (charger le code uniquement quand on en a besoin)
  imports: [RouterModule.forChild(routes)],
  
  // On exporte le RouterModule pour que le reste de l'application puisse utiliser les liens (routerLink)
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}