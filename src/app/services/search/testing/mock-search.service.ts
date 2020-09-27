import createSpy = jasmine.createSpy;


export class MockSearchService {
  public filterTransactions = createSpy();
}
