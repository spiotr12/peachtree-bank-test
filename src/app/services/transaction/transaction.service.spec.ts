import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ITransactionRecord } from 'src/app/models';
import { APP_STORE_KEY, AppActions } from 'src/app/+state';


describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [APP_STORE_KEY]: {
              transactions: null,
              sortDirection: 1,
              sortField: null,
            },
          },
        }),
      ],
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTransactions', () => {
    it('should return transactions', (done) => {
      // Arrange

      // Act
      service.getTransactions().subscribe((transactions) => {
        // Assert
        expect(transactions).toBeDefined();
        expect(transactions.length).toBeGreaterThan(0);
        done();
      });
    });
  });

  describe('createTransaction', () => {
    let store: MockStore;
    beforeEach(() => {
      store = TestBed.inject(MockStore);
    });

    it('should dispatch action', (done) => {
      // Arrange
      spyOn(store, 'dispatch').and.callThrough();
      store.setState({ [APP_STORE_KEY]: { transactions: [] } });
      const transaction: ITransactionRecord = {} as any;
      // Act
      service.createTransaction(transaction).subscribe((t) => {
        // Assert
        expect(t).toBeDefined();
        expect(store.dispatch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith(AppActions.loadTransactions({ transactions: jasmine.any(Array) as any }));
        done();
      });
    });

    it('should take latest transactions from the store', (done) => {
      // Arrange
      store.setState({ [APP_STORE_KEY]: { transactions: [] } });
      spyOn(store, 'select').and.callThrough();
      const transaction: ITransactionRecord = {} as any;
      // Act
      service.createTransaction(transaction).subscribe((t) => {
        // Assert
        expect(t).toBeDefined();
        expect(store.select).toHaveBeenCalled();
        done();
      });
    });
  });
});
