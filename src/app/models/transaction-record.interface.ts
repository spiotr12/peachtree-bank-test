import { IDates } from './dates.interface';
import { IMerchant } from './merchant.interface';
import { ITransaction } from './transaction.interface';


export interface ITransactionRecord {
  categoryCode: string;
  dates: IDates;
  transaction: ITransaction;
  merchant: IMerchant;
}
