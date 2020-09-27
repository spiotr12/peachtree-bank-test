import createSpy = jasmine.createSpy;


export class MockTransactionService {
  public getTransactions = createSpy();
  public createTransaction = createSpy();
}
