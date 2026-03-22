import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomainComponent } from './domain.component';

// 'describe' définit la suite de tests (le groupe) pour ce composant spécifique.
describe('DomainComponent', () => {
  // 'component' contiendra la logique TypeScript du composant.
  let component: DomainComponent;
  
  // 'fixture' est un outil puissant qui entoure le composant. 
  // Il permet d'interagir avec le code ET le rendu HTML (DOM).
  let fixture: ComponentFixture<DomainComponent>;

  // 'beforeEach' s'exécute AVANT chaque test individuel ('it').
  // Cela garantit que chaque test commence avec une version "propre" du composant.
  beforeEach(() => {
    // 1. Configuration du module de test (TestBed)
    // On crée un petit module Angular temporaire juste pour ce test.
    TestBed.configureTestingModule({
      declarations: [DomainComponent] // On indique quel composant on teste.
    });

    // 2. Création de l'instance du composant.
    fixture = TestBed.createComponent(DomainComponent);
    
    // 3. Récupération de l'instance de la classe.
    component = fixture.componentInstance;
    
    // 4. Déclenchement de la détection de changements.
    // Indispensable pour forcer Angular à générer le HTML initial (ngOnInit).
    fixture.detectChanges();
  });

  // 'it' décrit un cas de test précis. Ici, on vérifie la création du composant.
  it('should create', () => {
    // 'expect' définit une attente.
    // 'toBeTruthy' vérifie que l'objet 'component' existe bien (n'est pas null ou undefined).
    expect(component).toBeTruthy();
  });
});
