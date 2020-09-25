import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsHistoryComponent } from './transactions-history.component';
import { provideMockStore } from '@ngrx/store/testing';
import { APP_STORE_KEY } from 'src/app/+state';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('TransactionsHistoryComponent', () => {
  let component: TransactionsHistoryComponent;
  let fixture: ComponentFixture<TransactionsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsHistoryComponent],
      providers: [
        provideMockStore({
          initialState: {
            [APP_STORE_KEY]: {
              transactions: [],
              sortDirection: 1,
              sortField: null,
            },
          },
        }),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
