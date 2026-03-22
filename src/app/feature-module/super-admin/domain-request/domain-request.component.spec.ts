import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainRequestComponent } from './domain-request.component';

// 'describe' définit une suite de tests. C'est le conteneur principal qui regroupe tous les tests du composant.
describe('DomainRequestComponent', () => {
  let component: DomainRequestComponent; // Variable pour stocker l'instance de la classe du composant (le code TS).
  let fixture: ComponentFixture<DomainRequestComponent>; // Outil qui entoure le composant pour tester aussi son template (le code HTML).

  // 'beforeEach' s'exécute AVANT chaque test ('it'). 
  // Cela garantit que chaque test démarre avec une instance toute neuve du composant.
  beforeEach(() => {
    // 1. Configuration du module de test (simule un @NgModule)
    TestBed.configureTestingModule({
      declarations: [DomainRequestComponent] // On déclare le composant qu'on veut tester.
    });

    // 2. Création du composant dans un environnement de test isolé.
    fixture = TestBed.createComponent(DomainRequestComponent);
    
    // 3. Récupération de l'instance réelle (on peut maintenant accéder aux variables et méthodes du composant).
    component = fixture.componentInstance;
    
    // 4. Déclenchement manuel de la détection de changement d'Angular.
    // Cela force le rendu initial du HTML et l'exécution du ngOnInit().
    fixture.detectChanges();
  });

  // 'it' définit un cas de test individuel. Ici, on vérifie la création.
  it('should create', () => {
    // 'expect' est une affirmation. 
    // On vérifie si l'objet 'component' existe bien (n'est pas null ou undefined).
    expect(component).toBeTruthy();
  });
});