import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';
import { ITransactionRecord, SortField } from 'src/app/models';
import { Store } from '@ngrx/store';
import { AppActions, FromAppState } from 'src/app/+state';
import { take } from 'rxjs/operators';


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

  private sort$: Observable<{ sortDirection: number; sortField: SortField }>;

  constructor(private store: Store) {
    this.transactions$ = this.store.select(FromAppState.getTransactions);
    this.sort$ = this.store.select(FromAppState.getSort);
  }

  public sortByDate(): void {
    this.sort$.pipe(
      take(1),
    ).subscribe((sort) => {
      const direction = sort.sortField === SortField.Date ? sort.sortDirection * -1 : 1;
      this.store.dispatch(AppActions.sortTransactions({ sortField: SortField.Date, sortDirection: direction }));
    });
  }

  public sortByBeneficiary(): void {

    this.sort$.pipe(
      take(1),
    ).subscribe((sort) => {
      const direction = sort.sortField === SortField.Beneficiary ? sort.sortDirection * -1 : 1;
      this.store.dispatch(AppActions.sortTransactions({ sortField: SortField.Beneficiary, sortDirection: direction }));
    });
  }

  public sortByAmount(): void {
    this.sort$.pipe(
      take(1),
    ).subscribe((sort) => {
      const direction = sort.sortField === SortField.Amount ? sort.sortDirection * -1 : 1;
      this.store.dispatch(AppActions.sortTransactions({ sortField: SortField.Amount, sortDirection: direction }));
    });
  }
}
