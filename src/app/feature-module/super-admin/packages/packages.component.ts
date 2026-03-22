import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

// Définition d'une interface locale pour structurer les données des listes
interface data {
  value: string;
}

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  standalone: false // Indique que ce composant est déclaré dans un NgModule
})
export class PackagesComponent {
  // Importation des chemins de navigation pour les utiliser dans le HTML (ex: [routerLink])
  public routes = routes;

  // Variables pour stocker les choix de l'utilisateur dans les formulaires/sélecteurs
  public selectedValue1 = '';
  public selectedValue2 = '';

  // Liste d'options pour un premier menu déroulant (Périodicité)
  selectedList1: data[] = [
    { value: 'Monthly' },    // Mensuel
    { value: 'Yearly' },     // Annuel
    { value: 'Free Trail' }, // Essai gratuit
  ];

  // Liste d'options pour un second menu déroulant (Type de remise ou de prix)
  selectedList2: data[] = [
    { value: 'Fixed' },      // Fixe
    { value: 'Percentage' }  // Pourcentage
  ];

  // État pour afficher ou masquer une section (ex: un menu de filtre ou des détails)
  public toggleData = false;

  /**
   * Alterne la valeur de toggleData entre true et false.
   * Utilisé généralement pour ouvrir/fermer un panneau latéral ou un contenu rétractable.
   */
  openContent() {
    this.toggleData = !this.toggleData;
  }
}