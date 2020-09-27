import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHistoryComponent } from './transactions-history.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { APP_STORE_KEY, AppActions } from 'src/app/+state';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SortField } from 'src/app/models';
import { SearchService } from 'src/app/services';
import { MockSearchService } from 'src/app/services/search/testing';


describe('TransactionsHistoryComponent', () => {
  let component: TransactionsHistoryComponent;
  let fixture: ComponentFixture<TransactionsHistoryComponent>;
  let store: MockStore;
  let searchService: MockSearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsHistoryComponent],
      providers: [
        provideMockStore({
          initialState: {
            [APP_STORE_KEY]: {
              transactions: [],
              sortDirection: null,
              sortField: null,
            },
          },
        }),
        { provide: SearchService, useClass: MockSearchService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    searchService = TestBed.inject(SearchService) as any;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterTransactions on search service when search field changes', () => {
    // Arrange
    searchService.filterTransactions.and.returnValue([]);
    // Act
    component.searchField.setValue('123');
    // Assert
    expect(searchService.filterTransactions).toHaveBeenCalled();
  });

  it('should not call filterTransactions on search service when search field is null', () => {
    // Arrange
    searchService.filterTransactions.and.returnValue([]);
    // Act
    component.searchField.setValue(null);
    // Assert
    expect(searchService.filterTransactions).not.toHaveBeenCalled();
  });

  it('should not call filterTransactions on search service when search field is empty string', () => {
    // Arrange
    searchService.filterTransactions.and.returnValue([]);
    // Act
    component.searchField.setValue('');
    // Assert
    expect(searchService.filterTransactions).not.toHaveBeenCalled();
  });

  describe('sort', () => {
    it('should set sort direction to 1', () => {
      // Arrange
      spyOn(store, 'dispatch').and.callThrough();
      const sortField = SortField.Beneficiary;
      // Act
      component.sort(sortField);
      // Assert
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.sortTransactions({ sortField, sortDirection: 1 }));
    });

    it('should set sort direction to -1 when sort field is the same', () => {
      // Arrange
      const sortField = SortField.Beneficiary;
      const sortDirection = 1;
      store.setState({ [APP_STORE_KEY]: { sortField, sortDirection } });
      spyOn(store, 'dispatch').and.callThrough();
      // Act
      component.sort(sortField);
      // Assert
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.sortTransactions({ sortField, sortDirection: -1 }));
    });

    it('should keep sort direction when sort field change', () => {
      // Arrange
      const sortField = SortField.Beneficiary;
      const sortDirection = -1;
      store.setState({ [APP_STORE_KEY]: { sortField, sortDirection } });
      spyOn(store, 'dispatch').and.callThrough();
      const newSortField = SortField.Date;
      // Act
      component.sort(newSortField);
      // Assert
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.sortTransactions({ sortField: newSortField, sortDirection }));
    });
  });

  describe('resetSearch', () => {
    it('should reset search field', () => {
      // Arrange
      spyOn(component.searchField, 'reset').and.callThrough();
      // Act
      component.resetSearch();
      // Assert
      expect(component.searchField.reset).toHaveBeenCalled();
    });
  });
});
