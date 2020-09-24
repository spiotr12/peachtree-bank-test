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
    return of([...jsonTransactions.data] as any[]).pipe(
      map((trans) => trans
        .map((t) => this.mapTransaction(t)),
      ),
    );
  }

  public createTransaction(data: { fromAccount: string, toAccount: string, amount: number }): Observable<ITransactionRecord> {
    let transaction: ITransactionRecord = {
      dates: {
        valueDate: new Date(),
      },
      transaction: {
        type: 'Card Payment',
        creditDebitIndicator: 'DBIT',
        amountCurrency: {
          amount: data.amount,
          currencyCode: 'EUR',
        },
      },
      merchant: {
        name: data.toAccount,
        accountNumber: '0000 0000 0000 0000',
      },
      categoryCode: '#98C379',
    };

    transaction = this.mapTransaction(transaction);

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

  private mapTransaction(transaction: ITransactionRecord | any): ITransactionRecord {
    // Map transaction date to Date
    // transaction.dates.valueDate = new Date(transaction.dates.valueDate);
    return transaction;
  }
}
