import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppStore } from './app.interface';
import { APP_STORE_KEY } from './app.reducer';
import { ParseAmountPipe } from 'src/app/pipes/parse-amount';


const featureSelector = createFeatureSelector<IAppStore>(APP_STORE_KEY);

export class FromAppState {
  /**
   * Get transactions records
   */
  public static getTransactions = createSelector(
    featureSelector,
    (state) => state.transactions,
  );

  /**
   * Get sort information
   */
  public static getSort = createSelector(
    featureSelector,
    (state) => ({ sortField: state.sortField, sortDirection: state.sortDirection }),
  );

  /**
   * Get recent history balance
   */
  public static getBalance = createSelector(
    featureSelector,
    (state) => +state.transactions?.reduce(
      (acc, cur) => acc + FromAppState.parseAmountPipe.transform(cur?.transaction) || 0,
      0,
    ).toFixed(2),
  );

  private static parseAmountPipe = new ParseAmountPipe();
}
