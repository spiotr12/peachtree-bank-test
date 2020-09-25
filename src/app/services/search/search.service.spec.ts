import { TestBed } from '@angular/core/testing';

import { SearchService } from './search.service';
import { ITransactionRecord } from 'src/app/models';


describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('filterTransactions', () => {
    let transactions: ITransactionRecord[];

    beforeEach(() => {
      transactions = [
        { merchant: { name: 'Lego Store' }, id: 1 } as any,
        { merchant: { name: 'Alpine Bike' }, id: 2 } as any,
        { merchant: { name: 'Tesco' }, id: 3 } as any,
        { merchant: { name: 'Dalpine' }, id: 4 } as any,
      ];
    });

    it('should find transaction by exact name', () => {
      // Arrange
      const search = 'Lego Store';
      const expectedLength = 1;
      // Act
      const result = service.filterTransactions(search, transactions);
      // Assert
      expect(result.length).toEqual(expectedLength);
      for (const trans of result) {
        expect(trans.merchant.name).toContain(search);
      }
    });

    it('should find transaction by name in wrong case', () => {
      // Arrange
      const search = 'lego store';
      const expectedLength = 1;
      // Act
      const result = service.filterTransactions(search, transactions);
      // Assert
      expect(result.length).toEqual(expectedLength);
      for (const trans of result) {
        expect(trans.merchant.name.toLowerCase()).toContain(search);
      }
    });

    it('should find transactions by few letters', () => {
      // Arrange
      const search = 'lpi';
      const expectedLength = 2;
      // Act
      const result = service.filterTransactions(search, transactions);
      // Assert
      expect(result.length).toEqual(expectedLength);
      for (const trans of result) {
        expect(trans.merchant.name).toContain(search);
      }
    });

    it('should return all transactions when empty string', () => {
      // Arrange
      const search = '';
      const expectedLength = 4;
      // Act
      const result = service.filterTransactions(search, transactions);
      // Assert
      expect(result.length).toEqual(expectedLength);
      for (const trans of result) {
        expect(trans.merchant.name).toContain(search);
      }
    });

    it('should return all transactions when search is null', () => {
      // Arrange
      const search = null;
      const expectedLength = 4;
      // Act
      const result = service.filterTransactions(search, transactions);
      // Assert
      expect(result.length).toEqual(expectedLength);
    });
  });
});
