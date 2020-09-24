import { Action, createReducer, on } from '@ngrx/store';
import { IAppStore } from './app.interface';
import { AppActions } from './app.actions';


export const APP_STORE_KEY = 'app';

const initialState: IAppStore = {
  transactions: null,
};

const reducer = createReducer(
  initialState,
  on(AppActions.loadTransactions, (state, { transactions }) => ({
    ...state,
    ...{ transactions },
  })),
);

export function appReducer(state: IAppStore, action: Action): IAppStore {
  return reducer(state, action);
}
