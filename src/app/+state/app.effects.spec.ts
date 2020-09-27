import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Subject } from 'rxjs';
import { AppEffects } from './app.effects';
import { MockSortService } from 'src/app/services/sort/testing';
import { SortService } from 'src/app/services/sort';
import { SortField } from 'src/app/models';
import { APP_STORE_KEY } from './app.reducer';
import { AppActions, AppActionTypes } from './app.actions';


describe('AppEffects', () => {
  let actions$;
  let effects: AppEffects;
  let store: MockStore;
  let sortService: MockSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockStore({
          initialState: {
            [APP_STORE_KEY]: {
              transactions: null,
              sortDirection: 1,
              sortField: null,
            },
          },
        }),
        provideMockActions(() => actions$),
        { provide: SortService, useClass: MockSortService },
      ],
    });
    actions$ = new Subject<Action>();
    effects = TestBed.inject(AppEffects);
    store = TestBed.inject(MockStore);
    sortService = TestBed.inject(SortService) as any;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('onSort$', () => {
    it('should dispatch loadTransactions action', (done) => {
      // Arrange
      store.setState({ [APP_STORE_KEY]: { transactions: [] } });
      // Act
      effects.onSort$.subscribe((action) => {
        // Assert
        expect(action.type).toEqual(AppActionTypes.LoadTransactions);
        done();
      });
      actions$.next(AppActions.sortTransactions({ sortField: SortField.Beneficiary, sortDirection: -1 }));
    });

    it('should call sort on sortService', (done) => {
      // Arrange
      store.setState({ [APP_STORE_KEY]: { transactions: [] } });
      sortService.sortTransactions.and.returnValue([]);
      // Act
      effects.onSort$.subscribe(() => {
        // Assert
        expect(sortService.sortTransactions).toHaveBeenCalled();
        expect(sortService.sortTransactions).toHaveBeenCalledWith(SortField.Beneficiary, -1, []);
        done();
      });
      actions$.next(AppActions.sortTransactions({ sortField: SortField.Beneficiary, sortDirection: -1 }));
    });
  });
});
