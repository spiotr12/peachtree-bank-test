import { createAction, props } from '@ngrx/store';
import { ITransactionRecord } from 'src/app/models';


export enum AppActionTypes {
  LoadTransactions = '[App] Load Transactions',

}

export class AppActions {
  public static loadTransactions = createAction(AppActionTypes.LoadTransactions, props<{ transactions: ITransactionRecord[] }>());
}
