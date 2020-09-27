import createSpy = jasmine.createSpy;


/**
 * Mock Transactions sorting service
 */
export class MockSortService {

  /**
   * Sort transaction by given field
   */
  public sortTransactions = createSpy();

}
