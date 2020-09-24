import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ITransactionRecord } from 'src/app/models';
import { AppActions, FromAppState } from 'src/app/+state';
import * as jsonTransactions from 'src/mock/transactions.json';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(private store: Store) { }

  public getTransactions(): Observable<ITransactionRecord[]> {
    return of([...jsonTransactions.data] as any[]);
  }

  public createTransaction(transaction: ITransactionRecord): Observable<ITransactionRecord> {
    return this.store.select(FromAppState.getTransactions).pipe(
      take(1),
      tap((transactions) => {
        const trans = [...transactions];
        trans.push(transaction);
        // Simulate backend
        // In real life application here we could call this.getTransactions()
        // And update store
        this.store.dispatch(AppActions.loadTransactions({ transactions: trans }));
      }),
      map(() => transaction),
    );
  }
}
