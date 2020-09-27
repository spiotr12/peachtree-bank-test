import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialog } from '@angular/material/dialog';
import createSpy = jasmine.createSpy;

import { TransferFormComponent } from './transfer-form.component';
import { APP_STORE_KEY, AppActions } from 'src/app/+state';
import { of } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/test-page/confirm-dialog';
import { TransactionService } from 'src/app/services';
import { MockTransactionService } from 'src/app/services/transaction/testing';


class MockMatDialog {
  public open = createSpy();
}

describe('TransferFormComponent', () => {
  let component: TransferFormComponent;
  let fixture: ComponentFixture<TransferFormComponent>;
  let store: MockStore;
  let transactionService: MockTransactionService;
  let dialog: MockMatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransferFormComponent],
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
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: MatDialog, useClass: MockMatDialog },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    dialog = TestBed.inject(MatDialog) as any;
    transactionService = TestBed.inject(TransactionService) as any;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit', () => {
    it('should show alert when form is invalid', () => {
      // Arrange
      spyOn(window, 'alert').and.callFake(() => {});
      spyOnProperty(component.form, 'valid').and.returnValue(false);

      // Act
      component.submit();

      // Assert
      expect(dialog.open).not.toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Form invalid');
    });

    it('should open dialog', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of() };
      dialog.open.and.returnValue(mockDialogRef);
      spyOn(window, 'alert').and.callFake(() => {});
      spyOnProperty(component.form, 'valid').and.returnValue(true);

      // Act
      component.submit();

      // Assert
      expect(dialog.open).toHaveBeenCalled();
      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, { data: jasmine.any(Object) });
      expect(window.alert).not.toHaveBeenCalled();
    });

    it('should open dialog and pass correct data', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of() };
      const fromAccount = 'From Account';
      const toAccount = 'To Account';
      const transactionAccount = 123.45;
      dialog.open.and.returnValue(mockDialogRef);
      spyOn(window, 'alert').and.callFake(() => {});
      spyOnProperty(component.form, 'valid').and.returnValue(true);
      component.form.setValue({ fromAccount, toAccount, amount: transactionAccount });

      // Act
      component.submit();

      // Assert
      expect(dialog.open).toHaveBeenCalled();
      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
        data: {
          dates: { valueDate: jasmine.any(Date) },
          transaction: {
            type: fromAccount,
            creditDebitIndicator: 'DBIT',
            amountCurrency: {
              amount: transactionAccount,
              currencyCode: jasmine.any(String),
            },
          },
          merchant: {
            name: toAccount,
            accountNumber: jasmine.any(String),
          },
          categoryCode: jasmine.any(String),
        },
      });
    });

    it('should call createTransaction on transaction service', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of(true) };
      dialog.open.and.returnValue(mockDialogRef);
      transactionService.createTransaction.and.returnValue(of({}));
      spyOnProperty(component.form, 'valid').and.returnValue(true);

      // Act
      component.submit();

      // Assert
      expect(transactionService.createTransaction).toHaveBeenCalled();
    });

    it('should call getTransactions on transaction service', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of(true) };
      dialog.open.and.returnValue(mockDialogRef);
      transactionService.createTransaction.and.returnValue(of({}));
      transactionService.getTransactions.and.returnValue(of([]));
      spyOnProperty(component.form, 'valid').and.returnValue(true);

      // Act
      component.submit();

      // Assert
      expect(transactionService.getTransactions).toHaveBeenCalled();
    });

    it('should reset form when create transaction operation was successful', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of(true) };
      dialog.open.and.returnValue(mockDialogRef);
      transactionService.createTransaction.and.returnValue(of({}));
      transactionService.getTransactions.and.returnValue(of([]));
      spyOnProperty(component.form, 'valid').and.returnValue(true);
      spyOn(component.form, 'reset').and.callThrough();

      // Act
      component.submit();

      // Assert
      expect(component.form.reset).toHaveBeenCalled();
      expect(component.form.reset).toHaveBeenCalledWith({ fromAccount: jasmine.any(String) });
    });

    it('should not reset form when create transaction operation was canceled', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of(false) };
      dialog.open.and.returnValue(mockDialogRef);
      transactionService.createTransaction.and.returnValue(of({}));
      transactionService.getTransactions.and.returnValue(of([]));
      spyOnProperty(component.form, 'valid').and.returnValue(true);
      spyOn(component.form, 'reset').and.callThrough();

      // Act
      component.submit();

      // Assert
      expect(component.form.reset).not.toHaveBeenCalled();
    });

    it('should dispatch action when create transaction operation was successful', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of(true) };
      dialog.open.and.returnValue(mockDialogRef);
      transactionService.createTransaction.and.returnValue(of({}));
      const transactions = [];
      transactionService.getTransactions.and.returnValue(of(transactions));
      spyOnProperty(component.form, 'valid').and.returnValue(true);
      spyOn(store, 'dispatch').and.callThrough();

      // Act
      component.submit();

      // Assert
      expect(store.dispatch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith(AppActions.loadTransactions({ transactions }));
    });

    it('should not dispatch action when create transaction operation was canceled', () => {
      // Arrange
      const mockDialogRef = { afterClosed: () => of(false) };
      dialog.open.and.returnValue(mockDialogRef);
      transactionService.createTransaction.and.returnValue(of({}));
      const transactions = [];
      transactionService.getTransactions.and.returnValue(of(transactions));
      spyOnProperty(component.form, 'valid').and.returnValue(true);
      spyOn(store, 'dispatch').and.callThrough();

      // Act
      component.submit();

      // Assert
      expect(store.dispatch).not.toHaveBeenCalled();
    });
  });
});
