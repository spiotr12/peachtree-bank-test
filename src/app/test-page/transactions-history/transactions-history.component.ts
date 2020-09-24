import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ITransactionRecord, SortField } from 'src/app/models';
import { Store } from '@ngrx/store';
import { AppActions, FromAppState } from 'src/app/+state';
import { map, startWith, take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/search';


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

  public searchField = new FormControl('');

  public transactions$: Observable<ITransactionRecord[]>;

  @HostBinding('class.pbt-transactions-history')
  private readonly mainCSSClass = true;

  private sort$: Observable<{ sortDirection: number; sortField: SortField }>;

  constructor(private store: Store,
              private searchService: SearchService) {
    this.transactions$ = combineLatest([
      this.searchField.valueChanges.pipe(startWith('')),
      this.store.select(FromAppState.getTransactions),
    ]).pipe(
      map(([search, transactions]) => {
        return search ? this.searchService.filterTransactions(search, transactions) : transactions;
      }),
    );
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
