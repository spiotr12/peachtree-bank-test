import { InjectionToken } from '@angular/core';
import { ActionReducerMap } from '@ngrx/store';
import { APP_STORE_KEY, appReducer } from './app.reducer';


export const reducers: ActionReducerMap<any> = {
  [APP_STORE_KEY]: appReducer,
};

export const REDUCERS_TOKEN = new InjectionToken<ActionReducerMap<any>>('App Reducers');
export const reducerProvider = { provide: REDUCERS_TOKEN, useValue: reducers };
