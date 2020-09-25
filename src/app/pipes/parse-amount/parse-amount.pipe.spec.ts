import { ParseAmountPipe } from './parse-amount.pipe';
import { ITransaction } from 'src/app/models';


describe('ParseAmountPipe', () => {
  let pipe: ParseAmountPipe;
  beforeEach(() => {
    pipe = new ParseAmountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return positive value', () => {
    // Arrange
    const trans: ITransaction = {
      creditDebitIndicator: 'CRDT',
      amountCurrency: { amount: 200 },
    } as any;
    // Act
    const result = pipe.transform(trans);
    // Assert
    expect(result).toBeGreaterThan(0);
  });

  it('should return negative value', () => {
    // Arrange
    const trans: ITransaction = {
      creditDebitIndicator: 'DBIT',
      amountCurrency: { amount: 200 },
    } as any;
    // Act
    const result = pipe.transform(trans);
    // Assert
    expect(result).toBeLessThan(0);
  });
});
