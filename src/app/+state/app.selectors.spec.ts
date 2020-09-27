import { ITransactionRecord } from 'src/app/models';
import { FromAppState } from './app.selectors';


describe('FromAppState', () => {
  let transactions: ITransactionRecord[];

  beforeEach(() => {
    transactions = [
      { transaction: { creditDebitIndicator: 'CRDT', amountCurrency: { amount: 4000 } }, id: 1 } as any,
      { transaction: { creditDebitIndicator: 'DBIT', amountCurrency: { amount: 283.21 } }, id: 2 } as any,
      { transaction: { creditDebitIndicator: 'CRDT', amountCurrency: { amount: 89 } }, id: 3 } as any,
      { transaction: { creditDebitIndicator: 'DBIT', amountCurrency: { amount: 63.12 } }, id: 4 } as any,
    ];
  });

  describe('getBalance', () => {
    it('should calculate balance', () => {
      // Arrange
      const expectedBalance = 3742.67;
      // Act
      const result = FromAppState.getBalance.projector({ transactions });
      // Assert
      expect(result).toEqual(expectedBalance);
    });
  });
});
