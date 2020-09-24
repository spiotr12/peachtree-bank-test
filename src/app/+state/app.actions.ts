import { createAction, props } from '@ngrx/store';
import { ITransactionRecord, SortField } from 'src/app/models';


export enum AppActionTypes {
  LoadTransactions = '[App] Load Transactions',
  SortTransactions = '[App] Sort Transactions',
  ResetSort = '[App] Reset Sort',
}

export class AppActions {
  public static loadTransactions = createAction(AppActionTypes.LoadTransactions, props<{ transactions: ITransactionRecord[] }>());
  public static sortTransactions = createAction(AppActionTypes.SortTransactions, props<{ sortField: SortField; sortDirection: number }>());
  public static resetSort = createAction(AppActionTypes.ResetSort);
}
