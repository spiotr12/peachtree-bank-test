import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITransactionRecord } from 'src/app/models';
import * as transactions from 'src/mock/transactions.json';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor() { }

  public getTransactions(): Observable<ITransactionRecord[]> {
    return of([...transactions.data] as any[]).pipe(
      map((trans) => trans
        .map((t) => {
          // Map transaction date to Date
          t.dates.valueDate = new Date(t.dates.valueDate);
          // Map amount to number
          const amountMod = t.transaction.creditDebitIndicator === 'DBIT' ? -1 : 1;
          t.transaction.amountCurrency.amount = amountMod * Number(t.transaction.amountCurrency.amount);
          return t;
        }),
      ),
    );
  }
}
