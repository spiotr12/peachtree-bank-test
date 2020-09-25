import { Injectable } from '@angular/core';
import { ITransactionRecord, SortField } from 'src/app/models';
import { ParseAmountPipe } from 'src/app/pipes/parse-amount';


/**
 * Transactions sorting service
 */
@Injectable({
  providedIn: 'root',
})
export class SortService {

  constructor(private parseAmountPipe: ParseAmountPipe) { }

  /**
   * Sort transaction by given field
   */
  public sortTransactions(field: SortField, sort: number, transactions: ITransactionRecord[]): ITransactionRecord[] {
    switch (field) {
      case SortField.Date:
        return this.sortByDate(sort, transactions);
      case SortField.Beneficiary:
        return this.sortByBeneficiary(sort, transactions);
      case SortField.Amount:
        return this.sortByAmount(sort, transactions);
      default:
        return transactions;
    }
  }

  /**
   * Sort transaction by date
   */
  private sortByDate(sort: number, transactions: ITransactionRecord[]): ITransactionRecord[] {
    // @ts-ignore
    return transactions.sort((a, b) => (a?.dates?.valueDate - b?.dates?.valueDate) * sort);
  }

  /**
   * Sort transaction by beneficiary
   */
  private sortByBeneficiary(sort: number, transactions: ITransactionRecord[]): ITransactionRecord[] {
    return transactions.sort((a, b) => (a?.merchant?.name.localeCompare(b?.merchant?.name)) * sort);
  }

  /**
   * Sort transaction by amount
   */
  private sortByAmount(sort: number, transactions: ITransactionRecord[]): ITransactionRecord[] {
    return transactions.sort((a, b) => {
      return (this.parseAmountPipe.transform(a.transaction) - this.parseAmountPipe.transform(b.transaction)) * sort;
    });
  }

}
