import { ITransactionRecord } from 'src/app/models';


export interface IAppStore {
  transactions: ITransactionRecord[];
}
