import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlansListComponent } from './plans-list.component';

// 'describe' définit une suite de tests. C'est le titre du groupe de tests.
describe('PlansListComponent', () => {
  let component: PlansListComponent; // Variable pour stocker la classe du composant (sa logique).
  let fixture: ComponentFixture<PlansListComponent>; // Outil qui entoure le composant pour tester aussi son HTML.

  // 'beforeEach' s'exécute avant chaque test ('it'). 
  // On utilise 'async' car la compilation du template peut prendre du temps.
  beforeEach(async () => {
    // 1. Configuration du "laboratoire" de test (TestBed)
    await TestBed.configureTestingModule({
      declarations: [PlansListComponent] // On déclare le composant qu'on veut tester.
    })
    .compileComponents(); // Compile le HTML et le CSS du composant.
    
    // 2. Création de l'instance du composant
    fixture = TestBed.createComponent(PlansListComponent);
    
    // 3. Récupération de l'instance réelle (pour accéder aux variables et méthodes)
    component = fixture.componentInstance;
    
    // 4. Déclenchement de la détection de changements
    // Cela force Angular à exécuter ngOnInit et à rendre le HTML initial.
    fixture.detectChanges();
  });

  // 'it' définit un cas de test unique.
  it('should create', () => {
    // 'expect' est une affirmation.
    // On vérifie que le composant a bien été instancié (n'est pas null).
    expect(component).toBeTruthy();
  });
});