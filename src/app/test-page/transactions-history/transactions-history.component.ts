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

  public readonly SortField = SortField;

  public readonly searchField = new FormControl('');

  public readonly transactions$: Observable<ITransactionRecord[]>;

  public readonly sort$: Observable<{ sortDirection: number; sortField: SortField; }>;

  @HostBinding('class.pbt-transactions-history')
  private readonly mainCSSClass = true;

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

  public sort(sortField: SortField): void {
    this.sort$.pipe(
      take(1),
    ).subscribe((sort) => {
      const direction = sort.sortField === sortField ? sort.sortDirection * -1 : sort.sortDirection;
      this.store.dispatch(AppActions.sortTransactions({ sortField, sortDirection: direction }));
    });
  }

  public resetSearch(): void {
    this.searchField.reset();
  }
}
