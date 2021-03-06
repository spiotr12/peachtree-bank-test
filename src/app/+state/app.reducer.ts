import { Action, createReducer, on } from '@ngrx/store';
import { IAppStore } from './app.interface';
import { AppActions } from './app.actions';


export const APP_STORE_KEY = 'app';

const initialState: IAppStore = {
  transactions: null,
  sortDirection: null,
  sortField: null,
};

const reducer = createReducer(
  initialState,
  on(AppActions.loadTransactions, (state, { transactions }) => ({
    ...state,
    ...{ transactions },
  })),
  on(AppActions.sortTransactions, (state, { sortDirection, sortField }) => ({
    ...state,
    ...{ sortField, sortDirection },
  })),
  on(AppActions.resetSort, (state) => ({
    ...state,
    ...{ sortField: null, sortDirection: null },
  })),
);

export function appReducer(state: IAppStore, action: Action): IAppStore {
  return reducer(state, action);
}
