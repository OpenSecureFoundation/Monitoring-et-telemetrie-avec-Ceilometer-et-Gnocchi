import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionComponent } from './subscription.component';

// 'describe' définit une suite de tests. C'est le groupe principal pour ce composant.
describe('SubscriptionComponent', () => {
  let component: SubscriptionComponent; // Variable pour stocker la logique du composant (la classe .ts)
  let fixture: ComponentFixture<SubscriptionComponent>; // Outil qui enveloppe le composant pour tester aussi son rendu HTML

  // 'beforeEach' s'exécute AVANT chaque test ('it'). 
  // Cela permet de repartir d'une base propre pour chaque vérification.
  beforeEach(() => {
    // 1. Configuration du module de test (on simule un mini-module Angular).
    TestBed.configureTestingModule({
      declarations: [SubscriptionComponent] // On déclare le composant que l'on veut tester.
    });

    // 2. Création du composant dans l'environnement de test.
    fixture = TestBed.createComponent(SubscriptionComponent);
    
    // 3. Récupération de l'instance réelle (pour accéder aux variables et fonctions du composant).
    component = fixture.componentInstance;
    
    // 4. Déclenchement de la détection de changements.
    // Cela force Angular à exécuter ngOnInit() et à générer le HTML initial.
    fixture.detectChanges();
  });

  // 'it' définit un test individuel.
  it('should create', () => {
    // 'expect' exprime l'affirmation que l'on veut vérifier.
    // Ici, on vérifie que 'component' n'est pas nul et a bien été créé.
    expect(component).toBeTruthy();
  });
});