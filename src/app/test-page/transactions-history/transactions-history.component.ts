import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactionRecord } from 'src/app/models';
import { Store } from '@ngrx/store';
import { FromAppState } from 'src/app/+state';


/**
 * Component that handles transactions history
 */
@Component({
  selector: 'pbt-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsHistoryComponent {

  public transactions$: Observable<ITransactionRecord[]>;

  @HostBinding('class.pbt-transactions-history')
  private readonly mainCSSClass = true;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(FromAppState.getTransactions);
  }

}
