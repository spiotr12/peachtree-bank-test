import { IAmountCurrency } from './amount-currency.interface';


export interface ITransaction {
  amountCurrency: IAmountCurrency;
  type: string;
  creditDebitIndicator?: string | 'CRDT' | 'DBIT';
}
