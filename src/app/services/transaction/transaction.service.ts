import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITransactionRecord } from 'src/app/models';
import { MockTransactionService } from './mock-transaction.service';


@Injectable({
  providedIn: 'root',
  useClass: MockTransactionService,
})
export class TransactionService {

  constructor() { }

  public getTransactions(): Observable<ITransactionRecord[]> {
    return of([]); // This would call rest api server
  }
}
