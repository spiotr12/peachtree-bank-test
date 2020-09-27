import { appReducer } from './app.reducer';
import { AppActions } from 'src/app/+state/app.actions';
import { IAppStore } from 'src/app/+state/app.interface';
import { SortField } from 'src/app/models';


describe('appReducer', () => {
  let state: IAppStore;

  beforeEach(() => {
    state = {
      transactions: null,
      sortDirection: 1,
      sortField: null,
    };
  });

  it('should update store on loadTransactions action', () => {
    // Arrange
    const props = { transactions: [] };
    // Act
    const resultState = appReducer(state, AppActions.loadTransactions(props));
    // Assert
    expect(resultState.transactions).toBeDefined();
    expect(resultState.transactions.length).toEqual(0);
  });

  it('should update store on sortTransactions action', () => {
    // Arrange
    const props = { sortField: SortField.Amount, sortDirection: -1 };
    // Act
    const resultState = appReducer(state, AppActions.sortTransactions(props));
    // Assert
    expect(resultState.sortDirection).toBeDefined();
    expect(resultState.sortDirection).toEqual(-1);
    expect(resultState.sortField).toBeDefined();
    expect(resultState.sortField).toEqual(SortField.Amount);
  });

  it('should update store on resetSort action', () => {
    // Arrange
    // Act
    const resultState = appReducer(state, AppActions.resetSort());
    // Assert
    expect(resultState.sortDirection).toBeDefined();
    expect(resultState.sortDirection).toBeNull();
    expect(resultState.sortField).toBeDefined();
    expect(resultState.sortField).toBeNull();
  });
});
