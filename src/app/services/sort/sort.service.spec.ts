import { TestBed } from '@angular/core/testing';

import { SortService } from './sort.service';
import { ITransactionRecord, SortField } from 'src/app/models';
import { ParseAmountPipe } from 'src/app/pipes/parse-amount';


describe('SortService', () => {
  let service: SortService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ParseAmountPipe, // This should really be mocked but it is crucial for sorting
      ],
    });
    service = TestBed.inject(SortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sortTransactions', () => {
    it('should sort transactions by date asc', () => {
      // Arrange
      const transactions: ITransactionRecord[] = [
        { dates: { valueDate: new Date('2020-03-10') }, id: 1 } as any,
        { dates: { valueDate: new Date('2020-04-12') }, id: 2 } as any,
        { dates: { valueDate: new Date('2020-02-01') }, id: 3 } as any,
        { dates: { valueDate: new Date('2020-09-30') }, id: 4 } as any,
      ];
      const correctOrder = [3, 1, 2, 4];
      // Act
      const result = service.sortTransactions(SortField.Date, 1, transactions);
      // Assert
      expect(result.map((t: any) => t.id)).toEqual(correctOrder);
    });

    it('should sort transactions by date desc', () => {
      // Arrange
      const transactions: ITransactionRecord[] = [
        { dates: { valueDate: new Date('2020-03-10') }, id: 1 } as any,
        { dates: { valueDate: new Date('2020-04-12') }, id: 2 } as any,
        { dates: { valueDate: new Date('2020-02-01') }, id: 3 } as any,
        { dates: { valueDate: new Date('2020-09-30') }, id: 4 } as any,
      ];
      const correctOrder = [4, 2, 1, 3];
      // Act
      const result = service.sortTransactions(SortField.Date, -1, transactions);
      // Assert
      expect(result.map((t: any) => t.id)).toEqual(correctOrder);
    });

    it('should sort transactions by beneficiary asc', () => {
      // Arrange
      const transactions: ITransactionRecord[] = [
        { merchant: { name: 'Lego Store' }, id: 1 } as any,
        { merchant: { name: 'Alpine Bike' }, id: 2 } as any,
        { merchant: { name: 'Tesco' }, id: 3 } as any,
        { merchant: { name: 'Trend' }, id: 4 } as any,
      ];
      const correctOrder = [2, 1, 3, 4];
      // Act
      const result = service.sortTransactions(SortField.Beneficiary, 1, transactions);
      // Assert
      expect(result.map((t: any) => t.id)).toEqual(correctOrder);
    });

    it('should sort transactions by beneficiary desc', () => {
      // Arrange
      const transactions: ITransactionRecord[] = [
        { merchant: { name: 'Lego Store' }, id: 1 } as any,
        { merchant: { name: 'Alpine Bike' }, id: 2 } as any,
        { merchant: { name: 'Tesco' }, id: 3 } as any,
        { merchant: { name: 'Trend' }, id: 4 } as any,
      ];
      const correctOrder = [4, 3, 1, 2];
      // Act
      const result = service.sortTransactions(SortField.Beneficiary, -1, transactions);
      // Assert
      expect(result.map((t: any) => t.id)).toEqual(correctOrder);
    });

    it('should sort transactions by amount asc', () => {
      // Arrange
      const transactions: ITransactionRecord[] = [
        { transaction: { creditDebitIndicator: 'CRDT', amountCurrency: { amount: 4000 } }, id: 1 } as any,
        { transaction: { creditDebitIndicator: 'DBIT', amountCurrency: { amount: 283.21 } }, id: 2 } as any,
        { transaction: { creditDebitIndicator: 'CRDT', amountCurrency: { amount: 89 } }, id: 3 } as any,
        { transaction: { creditDebitIndicator: 'DBIT', amountCurrency: { amount: 63.12 } }, id: 4 } as any,
      ];
      const correctOrder = [2, 4, 3, 1];
      // Act
      const result = service.sortTransactions(SortField.Amount, 1, transactions);
      // Assert
      expect(result.map((t: any) => t.id)).toEqual(correctOrder);
    });

    it('should sort transactions by amount desc', () => {
      // Arrange
      const transactions: ITransactionRecord[] = [
        { transaction: { creditDebitIndicator: 'CRDT', amountCurrency: { amount: 4000 } }, id: 1 } as any,
        { transaction: { creditDebitIndicator: 'DBIT', amountCurrency: { amount: 283.21 } }, id: 2 } as any,
        { transaction: { creditDebitIndicator: 'CRDT', amountCurrency: { amount: 89 } }, id: 3 } as any,
        { transaction: { creditDebitIndicator: 'DBIT', amountCurrency: { amount: 63.12 } }, id: 4 } as any,
      ];
      const correctOrder = [1, 3, 4, 2];
      // Act
      const result = service.sortTransactions(SortField.Amount, -1, transactions);
      // Assert
      expect(result.map((t: any) => t.id)).toEqual(correctOrder);
    });
  });
});
