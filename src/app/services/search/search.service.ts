import { Injectable } from '@angular/core';
import { ITransactionRecord } from 'src/app/models';


/**
 * Transaction search service
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {

  constructor() { }

  /**
   * Filter transaction that contain search string
   */
  public filterTransactions(search: string, transactions: ITransactionRecord[]): ITransactionRecord[] {
    if (!search) {
      return transactions;
    }
    return transactions.filter((t) => {
      return t.merchant.name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
