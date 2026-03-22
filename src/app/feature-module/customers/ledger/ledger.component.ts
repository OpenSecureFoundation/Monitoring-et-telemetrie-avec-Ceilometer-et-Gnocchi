import { Component } from '@angular/core';
import { routes } from 'src/app/core/core.index';

@Component({
    selector: 'app-ledger',
    templateUrl: './ledger.component.html',
    styleUrls: ['./ledger.component.scss'],
    standalone: false
})
export class LedgerComponent {
  public routes = routes;
}
