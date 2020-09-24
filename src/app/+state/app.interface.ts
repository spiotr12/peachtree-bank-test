import { ITransactionRecord, SortField } from 'src/app/models';


export interface IAppStore {
  transactions: ITransactionRecord[];
  sortField: SortField;
  sortDirection: number;
}
