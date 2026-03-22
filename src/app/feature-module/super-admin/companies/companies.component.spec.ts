import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesComponent } from './companies.component';

// 'describe' définit une suite de tests. C'est le conteneur principal pour ton composant.
describe('CompaniesComponent', () => {
  let component: CompaniesComponent; // Référence à l'instance de ton composant
  let fixture: ComponentFixture<CompaniesComponent>; // Un "emballage" (wrapper) qui permet d'interagir avec le composant et son HTML

  // 'beforeEach' s'exécute AVANT chaque test ('it'). 
  // Cela permet de repartir de zéro pour chaque test.
  beforeEach(() => {
    // 1. Configuration du module de test (simule un @NgModule)
    TestBed.configureTestingModule({
      declarations: [CompaniesComponent] // On déclare le composant qu'on veut tester
    });

    // 2. Création du composant dans un environnement de test
    fixture = TestBed.createComponent(CompaniesComponent);
    
    // 3. Récupération de l'instance réelle de la classe (le code TypeScript)
    component = fixture.componentInstance;
    
    // 4. Déclenchement de la détection de changement (simule le rendu initial du HTML)
    fixture.detectChanges();
  });

  // 'it' définit un cas de test individuel.
  it('should create', () => {
    // 'expect' est une affirmation (assertion).
    // On vérifie si l'objet 'component' existe bien (n'est pas null ou undefined).
    expect(component).toBeTruthy();
  });
});