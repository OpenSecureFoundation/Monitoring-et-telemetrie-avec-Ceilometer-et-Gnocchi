import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackagesComponent } from './packages.component';

// 'describe' définit une "suite de tests". C'est le bloc principal qui regroupe tous les tests du composant.
describe('PackagesComponent', () => {
  let component: PackagesComponent; // Variable pour stocker l'instance de la classe du composant (le code TS).
  let fixture: ComponentFixture<PackagesComponent>; // Outil qui "enveloppe" le composant pour tester aussi son rendu (le HTML).

  // 'beforeEach' s'exécute AVANT chaque test ('it'). 
  // Cela garantit que chaque test démarre avec une instance propre et neuve du composant.
  beforeEach(() => {
    // 1. Configuration du module de test (simule un module Angular @NgModule).
    TestBed.configureTestingModule({
      declarations: [PackagesComponent] // On déclare le composant que l'on souhaite tester.
    });

    // 2. Création de l'instance du composant dans un environnement de test isolé.
    fixture = TestBed.createComponent(PackagesComponent);
    
    // 3. Récupération de l'instance réelle (permet d'accéder aux variables et fonctions du composant).
    component = fixture.componentInstance;
    
    // 4. Déclenchement de la détection de changements d'Angular.
    // Cela force le rendu initial du HTML (comme si Angular venait de charger la page).
    fixture.detectChanges();
  });

  // 'it' définit un cas de test individuel. Ici, on vérifie simplement la création.
  it('should create', () => {
    // 'expect' est une affirmation (assertion).
    // On vérifie que 'component' existe bien et qu'il est "truthy" (pas nul, pas d'erreur au constructeur).
    expect(component).toBeTruthy();
  });
});