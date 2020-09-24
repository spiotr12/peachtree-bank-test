import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppStore } from './app.interface';
import { APP_STORE_KEY } from './app.reducer';


const featureSelector = createFeatureSelector<IAppStore>(APP_STORE_KEY);

export class FromAppState {
  public static getTransactions = createSelector(
    featureSelector,
    (state) => state.transactions,
  );

  public static getSort = createSelector(
    featureSelector,
    (state) => ({ sortField: state.sortField, sortDirection: state.sortDirection }),
  );

  public static getBalance = createSelector(
    featureSelector,
    (state) => +state.transactions?.reduce(
      (acc, cur) => acc + cur?.transaction?.amountCurrency?.amount || 0,
      0,
    ).toFixed(2),
  );
}
