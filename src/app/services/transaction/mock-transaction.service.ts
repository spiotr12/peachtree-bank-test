import { Observable, of } from 'rxjs';
import * as transactions from 'src/mock/transactions.json';
import { ITransactionRecord } from 'src/app/models';
import { Injectable } from '@angular/core';


@Injectable()
export class MockTransactionService {

  constructor() { }

  public getTransactions(): Observable<ITransactionRecord[]> {
    return of(transactions.data);
  }
}
