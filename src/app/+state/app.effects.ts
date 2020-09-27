import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppActions, AppActionTypes } from './app.actions';
import { Store } from '@ngrx/store';
import { FromAppState } from 'src/app/+state/app.selectors';
import { of } from 'rxjs';
import { SortService } from 'src/app/services/sort';
import { ITransactionRecord, SortField } from 'src/app/models';


export interface ISort {
  sortField: SortField;
  sortDirection: number;
}

@Injectable()
export class AppEffects {

  public onSort$ = createEffect(() => this.actions$.pipe(
    ofType(AppActionTypes.SortTransactions),
    withLatestFrom(this.store.select(FromAppState.getTransactions)),
    mergeMap(([action, transactions]: [ISort, ITransactionRecord[]]) => {
      const sorted = this.sortService.sortTransactions(action.sortField, action.sortDirection, [...transactions]);
      return of(AppActions.loadTransactions({ transactions: sorted }));
    }),
  ));

  constructor(private actions$: Actions,
              private store: Store,
              private sortService: SortService) {}
}
