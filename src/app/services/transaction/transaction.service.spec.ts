import { TestBed } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { provideMockStore } from '@ngrx/store/testing';


describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ],
    });
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
