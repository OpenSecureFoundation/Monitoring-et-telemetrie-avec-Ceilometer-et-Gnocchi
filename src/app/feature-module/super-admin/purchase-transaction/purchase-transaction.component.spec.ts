import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseTransactionComponent } from './purchase-transaction.component';

// 'describe' définit la suite de tests. C'est le conteneur principal pour tous les tests liés à ce composant.
describe('PurchaseTransactionComponent', () => {
  let component: PurchaseTransactionComponent; // Variable pour stocker l'instance de la classe du composant (logique TS).
  let fixture: ComponentFixture<PurchaseTransactionComponent>; // Outil qui enveloppe le composant pour tester aussi son rendu (HTML/DOM).

  // 'beforeEach' s'exécute AVANT chaque test ('it'). 
  // Cela garantit que chaque test repart d'une base propre.
  beforeEach(() => {
    // 1. Configuration du module de test (simule l'environnement Angular).
    TestBed.configureTestingModule({
      declarations: [PurchaseTransactionComponent] // On déclare le composant à tester.
    });

    // 2. Création de l'instance du composant dans un environnement isolé.
    fixture = TestBed.createComponent(PurchaseTransactionComponent);
    
    // 3. Récupération de l'instance réelle (permet de manipuler les variables et fonctions du composant).
    component = fixture.componentInstance;
    
    // 4. Déclenchement manuel de la détection de changements.
    // Force Angular à générer le HTML initial et à exécuter ngOnInit().
    fixture.detectChanges();
  });

  // 'it' définit un cas de test individuel.
  it('should create', () => {
    // 'expect' exprime l'affirmation que l'on veut vérifier.
    // Ici, on vérifie que l'objet 'component' existe bien (n'est pas null ou undefined).
    expect(component).toBeTruthy();
  });
});